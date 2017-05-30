import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./RequestedMeal.action"
import {Link} from "react-router";

class RequestedMeal extends React.Component {
  componentDidMount(){
    this.props.getRequestedMealData(this.props.signin.id, this.props.signin.token);
  }
  render(){
    let data = this.props.requestedmeal.data;
    return(
      <div className="meallist_wrapper">
      <h2>Requested Meal</h2>
      {data && data.length>0? data.map((meal, idx)=>
        <div className="meallist_unit_div">
          <Link className="meallist_title_link" to={"/meal/"+meal.meal_id}><h4 className="meallist_title">{meal.title}</h4></Link>
          <p>{meal.mealdate.slice(0, meal.mealdate.indexOf("T"))}</p>
          <p>{meal.mealtime}</p>
          <p>{meal.address}, {meal.city}, {meal.state}</p>
          <p>${meal.price}/person</p>
          <img src={meal.url}/>
        </div>
      ):<p>I don&#39;t have any requested meal.</p>}
      </div>
    )
  }
}



const RequestedMealContainer = ReactRedux.connect(state=>state, actions)(RequestedMeal)

export default RequestedMealContainer;
