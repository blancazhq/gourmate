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
cloudinary.config(config.cconfig)

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/api/meals", function(req, res, next){
  db.any("select distinct on (meal.id) * from meal left outer join mealimg on meal.id = mealimg.meal_id")
   .then(data => {
      res.json(data)
   })
   .catch(next)
})

app.get("/api/meals/:id", function(req, res, next){
  let id = req.params.id;
  db.one(`select * from meal where id = $1`, id)
   .then(data => {
     db.any(`select url from mealimg where meal_id = $1`, id)
      .then((urls) => {
        data.url = [];
        urls.forEach((url)=>{
          data.url.push(url.url)
        })
        res.json(data)
      })
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
  let phone_number = req.body.phone_number;
  let email = req.body.email;
  let intro_title = req.body.intro_title;
  let intro_content = req.body.intro_content;
  let food_preference = req.body.food_preference;
  let food_restriction = req.body.food_restriction;

  bcrypt.genSalt(10)
    .then((salt)=>{
      return bcrypt.hash(password, salt)
    })
    .then((new_password)=>{
      return db.one(`insert into userinfo values(default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *`, [username,new_password,name,address,city,state,phone_number,email,intro_title,intro_content,food_preference, food_restriction])
    })
    .then(data => res.json(data))
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

app.post("/api/shoppingcart", function(req, res, next){
  let mealid = req.body.mealid;
  let quantity = req.body.quantity;
  let token = req.body.token;

  db.oneOrNone(`select * from shoppingcart where meal_id = $1`, mealid)
    .then((item) =>{
      if(item){
        db.one(`update shoppingcart set quantity = quantity + $1 where meal_id = $2 returning *`, [quantity, mealid])
          .then((entry) => {
            res.json(entry)
          })
      }else{
        db.one(`insert into shoppingcart values ($1, $2) returning *`, [mealid, quantity])
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
