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



const PurchasedMealContainer = ReactRedux.connect(state=>state, actions)(PurchasedMeal)

export default PurchasedMealContainer;
