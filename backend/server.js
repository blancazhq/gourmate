const express = require("express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const cors = require("cors");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const Promise = require("bluebird");
const config = require("./config");
const cloudinary = require("cloudinary")
const db = pgp(config.dbconfig);
cloudinary.config(config.cconfig);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/api/meals", function(req, res, next){
  db.any("select distinct on (meal.id) meal.id, title, mealdate, mealtime, meal.address, meal.city, meal.state, category, regular, price, peoplelimit, spottaken, url as mealimg, userinfo.id as hostid, name as hostname, imgurl as profileimg from meal left outer join mealimg on meal.id = mealimg.meal_id inner join userinfo on meal.host_id = userinfo.id")
   .then(data => {
      res.json(data)
   })
   .catch(next)
})

app.get("/api/meals/:id", function(req, res, next){
  let id = req.params.id;
  db.one(`select meal.id, title, mealdate, mealtime, meal.address, meal.city, meal.state, category, regular, price, peoplelimit, spottaken, userinfo.id as hostid, name as hostname, imgurl as profileimg from meal inner join userinfo on meal.host_id = userinfo.id where meal.id = $1 `, id)
   .then(data => {
     db.any(`select url from mealimg where meal_id = $1 and review_id isnull`, id)
      .then((urls) => {
        data.mealimg = [];
        urls.forEach((url)=>{
          data.mealimg.push(url.url)
        })
        return db.any(`select review_meal.id as reviewid, title, content, userinfo.id as reviewerid, userinfo.name as reviewername from review_meal inner join userinfo on review_meal.reviewer_id = userinfo.id where meal_id = $1`, id)
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
          return db.any(`select user_id, name, quantity from purchase inner join userinfo on purchase.user_id = userinfo.id where meal_id = $1`, id)
        })
        .then((ids)=>{
          data.guest = [];
          ids.forEach((user)=>{
            data.guest.push(user)
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
      res.status(401);
      res.json({
        message: "user not found"
      })
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
      res.status(401);
      res.json({
        message: 'Wrong Password'
      });
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
  db.any(`select title, content, sender_id, name as sender_name from message inner join userinfo on message.sender_id = userinfo.id where message.receiver_id = $1`, receiverid)
    .then((messages) => {
      res.json(messages)
    })
    .catch(next)
})

app.get("/api/message/sent", function(req, res, next){
  let senderid = req.query.id;
  db.any(`select title, content, receiver_id, name as receiver_name from message inner join userinfo on message.receiver_id = userinfo.id where message.sender_id = $1`, senderid)
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
  let imgs = req.body.imgs

  db.one(`insert into review_meal values (default, $1, $2, $3, $4) returning *`, [title, content, userid, mealid])
    .then((entry)=>{
      if(entry){
        let reviewid = entry.id;
        let promises = imgs.map((img)=>db.none(`insert into mealimg values (default, $1, $2, $3)`, [mealid, img, reviewid]))
        return Promise.all(promises);
      }
    })
    .then(()=>{
        res.json("done inserting review")
    })
    .catch(next)
})

app.post("/api/requestmeal", function(req, res, next){
  let mealid = req.body.mealid;
  let quantity = req.body.quantity;
  let userid = req.body.userid;
  let token = req.body.token;

  db.oneOrNone(`select * from request where meal_id = $1 and user_id = $2`, [mealid, userid])
    .then((item) =>{
      if(item){
        db.one(`update request set quantity = quantity + $1 where meal_id = $2 and user_id = $3 returning *`, [quantity, mealid, userid])
          .then((entry) => {
            res.json(entry)
          })
      }else{
        db.one(`insert into request values (default, $1, $2, $3) returning *`, [userid, mealid, quantity])
         .then((entry) => {
           res.json(entry)
         })
      }
    })
    .catch(next)
})

app.get("/api/shoppingcart", function(req, res, next){
  db.any(`select * from shoppingcart inner join meal on shoppingcart.meal_id = meal.id`)
    .then((meals) => {
      res.json(meals)
    })
    .catch(next)
})

app.post("/api/shoppingcart/checkout", function(req, res, next){
  let meals = req.body.meals;
  let token = req.body.token;
  let userid;
  db.one(`select * from auth_token where token = $1`, token)
  .then((entry)=>{
    userid = entry.user_id;
    let promises = meals.map((meal)=>{db.none(`insert into purchase values (default, $1, $2, $3)`, [userid, meal.meal_id, meal.quantity])})
    return Promise.all(promises)
  })
  .then(()=>{
    return db.any(`delete from shoppingcart`)
  })
  .then(()=>{
    res.json("done checking out")
  })
  .catch(next)
})

app.listen(3012, function(){
  console.log("listening on port 3012...")
})
