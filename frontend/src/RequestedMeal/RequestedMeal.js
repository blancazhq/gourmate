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
      <div>
      <h2>Requested Meal</h2>
      {data? data.map((meal, idx)=>
        <div className="meallist_unit_div">
          <Link className="meallist_title_link" to={"/meal/"+meal.meal_id}><p className="meallist_title">{meal.title}</p></Link>
          <p>{meal.mealdate.slice(0, meal.mealdate.indexOf("T"))}</p>
          <p>{meal.mealtime}</p>
          <p>{meal.address}, {meal.city}, {meal.state}</p>
          <p>${meal.price}/person</p>
          <img src={meal.url}/>
        </div>
      ):null}
      </div>
    )
  }
}



const RequestedMealContainer = ReactRedux.connect(state=>state, actions)(RequestedMeal)

export default RequestedMealContainer;
