CREATE TABLE userinfo (
  id serial primary key,
  username varchar,
  pw varchar,
  name varchar,
  address varchar,
  city varchar,
  state varchar,
  phone_number varchar,
  email varchar,
  intro_title varchar,
  intro_content varchar,
  food_preference varchar,
  food_restriction varchar,
  token varchar
)

CREATE TABLE meal (
  id serial primary key,
  title varchar,
  mealdate date,
  mealtime time,
  address varchar,
  city varchar,
  state varchar,
  category varchar,
  regular boolean,
  price real,
  peoplelimit integer,
  spottaken integer
)


CREATE TABLE auth_token (
  id serial primary key,
  user_id integer references userinfo(id),
  token varchar,
  time_created timestamp default now()
)


CREATE TABLE mealimg (
  id serial primary key,
  meal_id integer references meal(id),
  url varchar
)

CREATE TABLE review_meal (
  id serial primary key,
  title varchar,
  content varchar,
  reviewer_id integer references userinfo(id),
  meal_id integer references meal(id)
)

CREATE TABLE message (
  id serial primary key,
  title varchar,
  content varchar,
  sender_id integer references userinfo(id),
  receiver_id integer references userinfo(id),
  is_read boolean
)

CREATE TABLE meal_user (
  id serial primary key,
  user_id integer references userinfo(id),
  meal_id integer references meal(id),
  quantity integer,
  time_created timestamp default now(),
  status, varchar
)

CREATE TABLE meal_course (
  id serial primary key,
  name varchar,
  description varchar,
  type varchar,
  meal_id integer references meal(id),
  courseorder integer
)

CREATE TABLE meal_keyword (
  id serial primary key,
  word varchar,
  meal_id integer references meal(id)
)
