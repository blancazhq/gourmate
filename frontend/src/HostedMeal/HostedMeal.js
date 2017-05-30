import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./HostedMeal.action"
import {Link} from "react-router";

class HostedMeal extends React.Component {
  componentDidMount(){
    this.props.getHostedMealData(this.props.signin.id, this.props.signin.token);
  }
  render(){
    let data = this.props.hostedmeal.data;
    return(
      <div className="meallist_wrapper">
      <h2>Hosted Meal</h2>
      {data? data.map((meal, idx)=>
        <div className="meallist_unit_div">
          <Link className="meallist_title_link" to={"/meal/"+meal.id}><p className="meallist_title">{meal.title}</p></Link>
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


const HostedMealContainer = ReactRedux.connect(state=>state, actions)(HostedMeal)

export default HostedMealContainer;
