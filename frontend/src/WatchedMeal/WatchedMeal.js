import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./WatchedMeal.action"
import {Link} from "react-router";

class WatchedMeal extends React.Component {
  componentDidMount(){
    this.props.getWatchedMealData(this.props.signin.id, this.props.signin.token);
  }
  render(){
    let data = this.props.watchedmeal.data;
    let currentuserid = this.props.signin.id;
    let quantity = this.props.watchedmeal.quantity;
    let token = this.props.signin.token;
    return(
      <div>
      <h2>Watched Meal</h2>
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

          {meal.watched ? <button onClick={()=>this.props.unwatchMeal(idx, currentuserid, meal.meal_id, token)}>unwatch</button> : <button onClick={()=>this.props.watchMeal(idx, currentuserid, meal.meal_id, token)}>watch</button> }

          <input type="number" onChange={this.props.watchedMealQuantityChange} value={this.props.watchedmeal.quantity}/><label>people are going</label>
          {!meal.requested ? <button onClick={()=>this.props.requestWatchedMeal(idx, meal.meal_id, currentuserid, quantity, token)}>join this meal</button> : <button disabled>already joined</button>}
        </div>
      ):null}
      </div>
    )
  }
}



const WatchedMealContainer = ReactRedux.connect(state=>state, actions)(WatchedMeal)

export default WatchedMealContainer;
