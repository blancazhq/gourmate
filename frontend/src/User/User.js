import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./User.action"
import {Link} from "react-router"

class User extends React.Component {
  componentDidMount(){
    let id = this.props.params.id || this.props.signin.id;
    this.props.getSingleUserData(id);
  }
  render(){
    let data = this.props.user.data;
    return (
      <div id="user_wrapper">
      { data ?
        <div className="cf">
          <div id="user_info_div" className="cf">
            <img src={data.imgurl}/>
            <div id="user_info_content_div">
              <h2>{data.name}</h2>
              <div className={"display_star star"+Math.round(data.star)}></div>
              <h3>{data.intro_title}</h3>
              <p>{data.intro_content}</p>
              <p>food preference: {data.food_preference}</p>
            </div>
          </div>
          <div id="user_hosted_meal_div" className="cf">
          <p>I have hosted:</p>
          {data.meal.map((meal, idx)=>
            <div className="user_hosted_meal_unit_div" key={idx}>
              <img src={meal.url}/>
              <h2>{meal.title}</h2>
              <p>{meal.mealdate.slice(0, meal.mealdate.indexOf("T"))}</p>
              <Link to={"/meal/"+meal.meal_id}><button>check out this meal</button></Link>
            </div>)}
          </div>
        </div>
        : null
      }
      </div>
    )
  }
}


const UserContainer = ReactRedux.connect(state=>state, actions)(User)

export default UserContainer;
