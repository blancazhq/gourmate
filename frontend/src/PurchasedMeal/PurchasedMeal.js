import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./PurchasedMeal.action"
import {Link} from "react-router";

class PurchasedMeal extends React.Component {
  componentDidMount(){
    this.props.getPurchasedMealData(this.props.signin.id, this.props.signin.token);
  }
  render(){
    let data = this.props.purchasedmeal.data;
    return(
      <div>
      <h2>Purchased Meal</h2>
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



const PurchasedMealContainer = ReactRedux.connect(state=>state, actions)(PurchasedMeal)

export default PurchasedMealContainer;
