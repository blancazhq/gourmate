import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./ApprovedMeal.action"
import {Link} from "react-router";

class ApprovedMeal extends React.Component {
  componentDidMount(){
    this.props.getApprovedMealData(this.props.signin.id, this.props.signin.token);
  }
  render(){
    let data = this.props.approvedmeal.data;
    return(
      <div>
      <h2>Approved Meal</h2>
      {data? data.map((meal, idx)=>
        <div>
          <Link to={"/meal/"+meal.meal_id}><p>{meal.title}</p></Link>
          <p>{meal.mealdate.slice(0, meal.mealdate.indexOf("T"))}</p>
          <p>{meal.mealtime}</p>
          <p>{meal.address}</p>
          <p>{meal.city}</p>
          <p>{meal.state}</p>
          <p>{meal.price}</p>
          <img src={meal.url} width="150px"/>
        </div>
      ):null}
      </div>
    )
  }
}



const ApprovedMealContainer = ReactRedux.connect(state=>state, actions)(ApprovedMeal)

export default ApprovedMealContainer;
