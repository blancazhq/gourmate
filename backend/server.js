const express = require("express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const cors = require("cors");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const Promise = require("bluebird");
const config = require("./config");
const cloudinary = require("cloudinary");

var stripe = require("stripe")(
  "sk_test_hxVLgiPwvBFLgu0BOVWpMY1g"
);
const db = pgp(config.dbconfig);
cloudinary.config(config.cconfig);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const http = require("http").Server(app);
const io = require("socket.io")(http);

var people= [];

function Person (name, id){
  this.name = name;
  this.id = id;
}

io.on('connection', function(socket){
  socket.on("join", function(screenName){
    console.log(screenName, "join", socket.id)
    socket.screenName = screenName;
    var person = new Person(screenName, socket.id);
    people.push(person);
    io.emit("join", [socket.screenName, people])
  });

  socket.on("typing", function(msg){
    io.emit('typing', msg);
  })

  socket.on("change name", function(name){
    socket.screenName = name;
    var person = new Person(name, socket.id);
    people.push(person);
    io.emit("join", [name, people])
  })

  socket.on("sign out", function(name){
    for(var i=0;i<people.length;i++){
      if(people[i].id===socket.id){
        people.splice(i, 1);
      }
    }
    socket.broadcast.emit("leave", [name, people]);
  })

  socket.on('chat message', function(array){
    var msg = array[0];
    var to = array[1];
    var introduction = socket.screenName+" to "+to+"(private): "
    if(to==="all"){
      io.emit('chat message', socket.screenName+": "+msg);
    }else{
      var id
      for(var i=0;i<people.length;i++){
        if(people[i].name===to){
          id = people[i].id;
        }
      }
      socket.emit('chat message', introduction+msg)
      if (id in io.sockets.connected) {
        io.sockets.connected[id].emit('chat message', introduction+msg);
      }
    }
  });

  socket.on('disconnect', function(){
    for(var i=0;i<people.length;i++){
      if(people[i].id===socket.id){
        people.splice(i, 1);
      }
    }
    socket.broadcast.emit("leave", [socket.screenName, people]);
  });
});

app.get("/api/featuredmeals", function(req, res, next){
  let collection = {};
  db.one(`select * from meal left outer join mealimg on meal.id = mealimg.meal_id inner join userinfo on meal.host_id = userinfo.id where meal.star is not null order by meal.star desc limit 1`)
    .then(data => {
      collection.starmeal = data;
      return db.one(`select * from meal left outer join mealimg on meal.id = mealimg.meal_id inner join userinfo on meal.host_id = userinfo.id where meal.id != $1 order by spottaken desc limit 1`, data.meal_id)
    })
    .then(data => {
      collection.mostpopular = data;
      return db.one(`select * from meal left outer join mealimg on meal.id = mealimg.meal_id inner join userinfo on meal.host_id = userinfo.id where meal.id !=$1 and meal.id!=$2 order by meal.price limit 1`, [data.meal_id, collection.starmeal.meal_id])
    })
    .then(data => {
      collection.cheapest = data;
      res.json(collection)
    })
    .catch(next)
})

app.get("/api/meals", function(req, res, next){
  let keyword = req.query.keyword;
  let city = req.query.city;
  let state = req.query.state;

  if(!keyword){
    db.any(`select distinct on (meal.id) meal.id, title, content, mealdate, mealtime, meal.address, meal.city, meal.state, price, peoplelimit, spottaken, url as mealimg, userinfo.id as hostid, name as hostname, imgurl as profileimg from meal left outer join mealimg on meal.id = mealimg.meal_id inner join userinfo on meal.host_id = userinfo.id where meal.city ilike $1 and meal.state ilike $2 limit 9`,[`%${city}%`, `%${state}%`])
     .then(data => {
       res.json(data)
     })
     .catch(next)
  }else{
    db.any(`select distinct on (meal.id) meal.id, title,content, mealdate, mealtime, meal.address, meal.city, meal.state, price, peoplelimit, spottaken, url as mealimg, userinfo.id as hostid, name as hostname, imgurl as profileimg, word as keyword from meal left outer join meal_keyword on meal_keyword.meal_id = meal.id left outer join mealimg on meal.id = mealimg.meal_id inner join userinfo on meal.host_id = userinfo.id where (meal_keyword.word ilike $1 or meal.title ilike $1 or meal.content ilike $1) and meal.city ilike $2 and meal.state ilike $3`,[`%${keyword}%`,`%${city}%`, `%${state}%`])
     .then(data => {
       res.json(data)
     })
     .catch(next)
  }
})

app.get("/api/meals/:id", function(req, res, next){
  let id = req.params.id;
  db.one(`select meal.id, title, mealdate, mealtime, meal.address, meal.city, meal.state, price, peoplelimit, spottaken, meal.star, userinfo.id as hostid, name as hostname, imgurl as profileimg from meal inner join userinfo on meal.host_id = userinfo.id where meal.id = $1 `, id)
   .then(data => {
     db.any(`select url from mealimg where meal_id = $1 and review_id isnull`, id)
      .then((urls) => {
        data.mealimg = [];
        urls.forEach((url)=>{
          data.mealimg.push(url.url)
        })
        return db.any(`select review_meal.id as reviewid, title, content,review_meal.star, userinfo.id as reviewerid, userinfo.name as reviewername from review_meal inner join userinfo on review_meal.reviewer_id = userinfo.id where meal_id = $1`, id)
      })
      .then((reviews) => {
        let promises = [];
        reviews.forEach((review)=>{
          let promise = new Promise((resolve, reject)=>{
            db.any(`select url from mealimg where meal_id = $1 and review_id = $2`, [id, review.reviewid])
              .then((urls)=>{
                review.img = [];
                urls.forEach((url)=>{
                  review.img.push(url.url)
                })
              })
              .then(()=>{
                resolve()
              })
          })
          promises.push(promise);
        })
        Promise.all(promises)
        .then(()=>{
          data.review = [];
          reviews.forEach((review)=>{
            data.review.push(review)
          })
          return db.any(`select user_id, name, quantity from meal_user inner join userinfo on meal_user.user_id = userinfo.id where meal_id = $1 and status = 'purchased'`, id)
        })
        .then((ids)=>{
          data.guest = [];
          ids.forEach((user)=>{
            data.guest.push(user)
          })
          return db.any(`select * from meal_keyword where meal_id = $1`, id)
        })
        .then((keywords)=>{
          data.keyword = [];
          keywords.forEach((keyword)=>{
            data.keyword.push(keyword)
          })
          return db.any(`select * from meal_course where meal_id = $1`, id)
        })
        .then((courses)=>{
          data.course = [];
          courses.forEach((course)=>{
            data.course.push(course)
          })
          res.json(data)
        })
      })
   })
   .catch(next)
})

app.get("/api/users/:id", function(req, res, next){
  let id = req.params.id;
  db.one(`select * from userinfo where userinfo.id = $1 `, id)
   .then(data => {
     db.any(`select distinct on (meal.id) * from meal left outer join mealimg on meal.id = mealimg.meal_id where meal.host_id = $1`, id)
      .then((meals) => {
        data.meal = [];
        meals.forEach((meal)=>{
          data.meal.push(meal)
        })
        res.json(data)
      })
   })
   .catch(next)
})

app.get("/api/finduser", function(req, res, next){
  let name = req.query.name;
  db.any(`select * from userinfo where name ilike $1 `, `%${name}%`)
   .then(data => {
      res.json(data)
   })
   .catch(next)
})

app.get("/api/usernamevalidate", function(req, res, next){
  let username = req.query.username;
  db.oneOrNone(`select * from userinfo where username = $1 `, username)
   .then(data => {
      if(data){
        res.json("username is occupied");
      }else{
        res.json("username is good");
      }
   })
   .catch(next)
})

app.post("/api/user/signup", function(req, res, next){
  let username = req.body.username;
  let password = req.body.password;
  let name = req.body.name;
  let address = req.body.address;
  let city = req.body.city;
  let state = req.body.state;
  let phone_number = req.body.phonenumber;
  let email = req.body.email;
  let intro_title = req.body.introtitle;
  let intro_content = req.body.introcontent;
  let food_preference = req.body.foodpreference;
  let food_restriction = req.body.foodrestriction;
  let img = req.body.img;

  bcrypt.genSalt(10)
    .then((salt)=>{
      return bcrypt.hash(password, salt)
    })
    .then((new_password)=>{
      return db.one(`insert into userinfo values(default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *`, [username,new_password,name,address,city,state,phone_number,email,intro_title,intro_content,food_preference, food_restriction, img])
    })
    .then(() => res.json("done inserting"))
    .catch(next)
})

app.post("/api/user/signin", function(req, res, next){
  let username = req.body.username;
  let password = req.body.password;
  let token = uuid.v4();
  let current_user;
  db.oneOrNone(`select * from userinfo where username = $1`, username)
  .then((user)=>{
    current_user = user;
    if(user){
      return bcrypt.compare(password, user.pw)
    }else{
      res.json("user not found")
    }
  })
  .then((match)=>{
    if(match){
      db.none(`insert into auth_token values (default, $1, $2)`, [current_user.id, token])
       .then(() => {
         current_user.token = token;
         res.json(current_user)
       })
    }else{
      res.json('wrong password');
    }
  })
  .catch(next)
})

app.use(function authentication(req, res, next){
  let token = req.body.token || req.query.token;
  if(token === undefined){
    res.status(401)
    res.json({
      message: "unauthorized"
    })
  }else{
    db.oneOrNone(`select * from auth_token where token = $1`, token)
     .then((user) => {
       console.log("authentication failed2")
       if(user){
         next();
       }else{
         res.status(401)
         res.json({
           message: "unauthorized"
         })
       }
     })
  }
});

app.get("/api/message/inbox", function(req, res, next){
  let receiverid = req.query.id;
  db.any(`select message.id, message.title as messagetitle, message.content as messagecontent, sender_id, name as sender_name, is_read, related_meal_id, meal.title as mealtitle from message inner join userinfo on message.sender_id = userinfo.id left outer join meal on meal.id = message.related_meal_id where message.receiver_id = $1`, receiverid)
    .then((messages) => {
      res.json(messages)
    })
    .catch(next)
})

app.post("/api/message/read", function(req, res, next){
  let messageid = req.body.messageid;
  db.one(`update message set is_read = true where id = $1 returning *`, messageid)
    .then((entry)=>{
      res.json(entry)
    })
    .catch(next)
})

app.get("/api/message/sent", function(req, res, next){
  let senderid = req.query.id;
  db.any(`select message.id, message.title as messagetitle, message.content as messagecontent, receiver_id, name as receiver_name,  related_meal_id, meal.title as mealtitle from message inner join userinfo on message.receiver_id = userinfo.id left outer join meal on meal.id = message.related_meal_id where message.sender_id = $1`, senderid)
    .then((messages) => {
      res.json(messages)
    })
    .catch(next)
})

app.post("/api/message", function(req, res, next){
  let title = req.body.title;
  let content = req.body.content;
  let senderid = req.body.senderid;
  let receiverid = req.body.receiverid;

  db.one(`insert into message values (default, $1, $2, $3, $4) returning *`, [title, content, senderid,receiverid])
    .then((entry)=> {
      res.json(entry)
    })
    .catch(next)
})

app.post("/api/review", function(req, res, next){
  let title = req.body.title;
  let content = req.body.content;
  let userid = req.body.userid;
  let mealid = req.body.mealid;
  let star = req.body.star;
  let imgs = req.body.imgs;

  db.one(`insert into review_meal values (default, $1, $2, $3, $4, $5) returning *`, [title, content, userid, mealid, star])
    .then((entry)=>{
      if(entry){
        let reviewid = entry.id;
        if(imgs){
          let promises = imgs.map((img)=>db.none(`insert into mealimg values (default, $1, $2, $3)`, [mealid, img, reviewid]))
          return Promise.all(promises);
        }
      }
    })
    .then(()=>{
      return db.one(`update meal set star = (select avg(star) from review_meal where meal_id = $1) where id = $1 returning *`, mealid)
    })
    .then((entry)=>{
      console.log("1")
      return db.one(`update userinfo set star = (select avg(star) from meal where host_id = $1) where id = $1 returning *`, entry.host_id)
    })
    .then((entry)=>{
      console.log(entry)
      res.json("done inserting review")
    })
    .catch(next)
})

app.get("/api/mealstatus", function(req, res, next){
  let mealid = req.query.mealid;
  let userid = req.query.userid;
  let token = req.query.token;

  db.oneOrNone(`select status from meal_user where meal_id = $1 and user_id = $2`, [mealid, userid])
    .then((entry)=>{
      if(entry){
        res.json(entry.status)
      }else{
        res.json("not watched")
      }
    })
    .catch(next)
})

app.post("/api/requestmeal", function(req, res, next){
  let mealid = req.body.mealid;
  let quantity = req.body.quantity;
  let userid = req.body.userid;
  let token = req.body.token;

  db.oneOrNone(`select * from meal_user where meal_id = $1 and user_id = $2 and (status = 'watched' or status = 'requested')`, [mealid, userid])
    .then((item) =>{
      if(item){
        if(item.status === "requested"){
          return db.one(`update meal_user set quantity = quantity + $1 where meal_id = $2 and user_id = $3 returning *`, [quantity, mealid, userid])
            .then((entry) => {
              res.json(entry)
            })
        }else if(item.status === "watched"){
          return db.one(`update meal_user set quantity = $1, status = 'requested' where meal_id = $2 and user_id = $3 returning *`, [quantity, mealid, userid])
            .then((entry) => {
              res.json(entry)
            })
        }
      }else{
        return db.one(`insert into meal_user values (default, $1, $2, $3, default, 'requested') returning *`, [userid, mealid, quantity])
         .then((entry) => {
           res.json(entry)
         })
      }
    })
    .catch(function(err){
      console.log("err", err)
      next(err)
    })
})

app.get("/api/watchedmeal", function(req, res, next){
  let id = req.query.id;
  db.any(`select distinct on (meal.id) * from meal_user inner join meal on meal_user.meal_id = meal.id inner join mealimg on mealimg.meal_id = meal.id where status = 'watched' and user_id = $1`, id)
    .then((meals) => {
      res.json(meals)
    })
    .catch(next)
})

app.post("/api/watchedmeal", function(req, res, next){
  let userid = req.body.userid;
  let mealid = req.body.mealid;
  db.one(`insert into meal_user values (default, $1, $2, default, default, 'watched') returning *`, [userid, mealid])
    .then((entry) => {
      res.json(entry)
    })
    .catch(next)
})

app.delete("/api/watchedmeal", function(req, res, next){
  let userid = req.body.userid;
  let mealid = req.body.mealid;
  db.one(`delete from meal_user where user_id = $1 and meal_id = $2 and status = 'watched' returning *`, [userid, mealid])
    .then((entry) => {
      res.json(entry)
    })
    .catch(next)
})

app.get("/api/requestedmeal", function(req, res, next){
  let id = req.query.id;
  db.any(`select distinct on (meal.id) * from meal_user inner join meal on meal_user.meal_id = meal.id left outer join mealimg on mealimg.meal_id = meal.id where status = 'requested' and user_id = $1`, id)
    .then((meals) => {
      res.json(meals)
    })
    .catch(next)
})

app.get("/api/approvedmeal", function(req, res, next){
  let id = req.query.id;
  db.any(`select distinct on (meal.id) * from meal_user inner join meal on meal_user.meal_id = meal.id left outer join mealimg on mealimg.meal_id = meal.id where status = 'approved' and user_id = $1`, id)
    .then((meals) => {
      res.json(meals)
    })
    .catch(next)
})


app.post("/api/payment", function(req, res, next){
  let userid = req.body.userid;
  let mealid = req.body.mealid;
  let quantity = req.body.quantity;
  let stripetoken = req.body.stripetoken;
  let description = req.body.description;

  stripe.charges.create({
    amount: 2000,
    currency: "usd",
    source: stripetoken, // obtained with Stripe.js
    description: "Charge for "+ description
  }, function(err, charge) {
    if(charge){
      db.one(`update meal_user set status = 'purchased' where meal_id = $1 and user_id = $2 returning *`, [mealid, userid])
        .then((entry)=>{
          return db.one(`update meal set spottaken = spottaken + $1 where id = $2 returning *`, [quantity, mealid])
        })
        .then((entry)=>{
          res.json(entry)
        })
        .catch(next)
    }
  });
})

app.get("/api/purchasedmeal", function(req, res, next){
  let id = req.query.id;
  db.any(`select distinct on (meal.id) * from meal_user inner join meal on meal_user.meal_id = meal.id left outer join mealimg on mealimg.meal_id = meal.id where status = 'purchased' and user_id = $1`, id)
    .then((meals) => {
      res.json(meals)
    })
    .catch(next)
})


app.post("/api/becomeahost", function(req, res, next){
  let userid = req.body.userid;

  db.one(`update userinfo set is_host = true where id = $1 returning *`, userid)
  .then((entry)=>{
    res.json(entry)
  })
  .catch(next)
})

app.get("/api/hostedmeal", function(req, res, next){
  let id = req.query.id;
  db.any(`select distinct on (meal.id) * from meal left outer join mealimg on mealimg.meal_id = meal.id where host_id = $1`, id)
    .then((meals) => {
      res.json(meals)
    })
    .catch(next)
})

app.post("/api/createmeal", function(req, res, next){
  let id = req.body.id;
  let introtitle = req.body.introtitle;
  let introcontent = req.body.introcontent;
  let mealdate = req.body.mealdate;
  let mealtime = req.body.mealtime;
  let address = req.body.address;
  let city = req.body.city;
  let state = req.body.state;
  let price = req.body.price;
  let peoplelimit = req.body.peoplelimit;
  let course = req.body.course;
  let keyword = req.body.keyword;
  let img = req.body.img;
  let mealid;

  db.one(`insert into meal values(default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`, [introtitle, mealdate, mealtime, address, city, state, price, peoplelimit, 0, id, introcontent])
  .then((data) => {
    mealid = data.id;
    if(img){
      let promises = img.map((img)=>{
        db.none(`insert into mealimg values(default, $1, $2, default)`,[mealid, img])
      })
      return Promise.all(promises)
    }
  })
  .then(()=>{
    if(course){
      let promises = course.map((course, idx)=>{
        db.none(`insert into meal_course values(default, $1, $2, $3, $4, $5)`,[course.name, course.description, course.type, mealid, (idx+1)])
      })
      return Promise.all(promises)
    }
  })
  .then(()=>{
    if(keyword){
      let promises = keyword.map((keyword)=>{
        db.none(`insert into meal_keyword values(default, $1, $2)`,[keyword, mealid])
      })
      return Promise.all(promises)
    }
  })
  .then(()=>{
    res.json("done inserting")
  })
  .catch(next)
})

app.get("/api/managerequest", function(req, res, next){
  let id = req.query.id;
  db.any(`select user_id, meal_id, mealdate, mealtime, quantity, title, name, imgurl from meal_user inner join meal on meal.id = meal_user.meal_id inner join userinfo on meal_user.user_id = userinfo.id where meal_user.status = 'requested' and meal.host_id = $1 order by meal_user.meal_id`, id)
    .then((requests) => {
      res.json(requests)
    })
    .catch(next)
})

app.post("/api/acceptrequest", function(req, res, next){
  let userid = req.body.userid;
  let mealid = req.body.mealid;
  let hostid = req.body.hostid;
  let hostname = req.body.hostname;
  let mealtitle = req.body.mealtitle;
  let requestentry;
  let messagetitle = hostname+" has approved your request";
  let messagecontent = hostname+" has approved your request for ";

  db.one(`update meal_user set status = 'approved' where user_id = $1 and meal_id = $2 and status = 'requested' returning *`, [userid, mealid])
  .then((request) => {
    requestentry = request;
    return db.one(`insert into message values(default, $1, $2, $3, $4, false, $5) returning *`, [messagetitle, messagecontent, hostid, userid, mealid])
  })
  .then((message)=>{
    res.json(requestentry)
  })
  .catch(next)
})

app.post("/api/declinerequest", function(req, res, next){
  let userid = req.body.userid;
  let mealid = req.body.mealid;
  let hostid = req.body.hostid;
  let hostname = req.body.hostname;
  let mealtitle = req.body.mealtitle;
  let requestentry;
  let messagetitle = hostname+" has declined your request";
  let messagecontent = hostname+" has declined your request for ";

  db.one(`update meal_user set status = 'declined' where user_id = $1 and meal_id = $2 and status = 'requested' returning *`, [userid, mealid])
  .then((request) => {
    requestentry = request;
    return db.one(`insert into message values(default, $1, $2, $3, $4, false, $5) returning *`, [messagetitle, messagecontent, hostid, userid, mealid])
  })
  .then((message)=>{
    res.json(requestentry)
  })
  .catch(next)
})

http.listen(3012, function(){
  console.log("listening on port 3012...")
})
