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
    let userid = this.props.signin.id;
    let token = this.props.signin.token;

    return(
      <div>
      <h2>Approved Meal</h2>
      {data? data.map((meal, idx)=>
        <div className="meallist_unit_div">
          <Link className="meallist_title_link" to={"/meal/"+meal.meal_id}><p className="meallist_title">{meal.title}</p></Link>
          <p>{meal.mealdate.slice(0, meal.mealdate.indexOf("T"))}</p>
          <p>{meal.mealtime}</p>
          <p>{meal.address}, {meal.city}, {meal.state}</p>
          <p>${meal.price}/person</p>
          <p>party of {meal.quantity}</p>
          <img src={meal.url}/>

          {meal.is_paid ? <p>this meal has been paid for.</p>:<button className="pay_button" onClick={()=>this.props.checkout(idx, meal.meal_id, meal.title, meal.price, meal.quantity, userid, token)}>make a payment</button>}

        </div>
      ):null}
      </div>
    )
  }
}



const ApprovedMealContainer = ReactRedux.connect(state=>state, actions)(ApprovedMeal)

export default ApprovedMealContainer;
