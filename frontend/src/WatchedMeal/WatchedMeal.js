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
      <div className="meallist_wrapper">
      <h2>Watched Meal</h2>
      {data && data.length>0? data.map((meal, idx)=>
        <div className="meallist_unit_div">
          <Link className="meallist_title_link" to={"/meal/"+meal.meal_id}><p className="meallist_title">{meal.title}</p></Link>

          {meal.watched ? <button className="meallist_watch_button" onClick={()=>this.props.unwatchMeal(idx, currentuserid, meal.meal_id, token)}>unwatch</button> : <button className="meallist_watch_button" onClick={()=>this.props.watchMeal(idx, currentuserid, meal.meal_id, token)}>watch</button> }

          <p>{meal.mealdate.slice(0, meal.mealdate.indexOf("T"))}</p>
          <p>{meal.mealtime}</p>
          <p>{meal.address}, {meal.city}, {meal.state}</p>
          <p>${meal.price}/person</p>
          <img src={meal.url}/>


          <div className="meallist_join_number_div">
            <input type="number" onChange={this.props.watchedMealQuantityChange} value={this.props.watchedmeal.quantity} max={meal.peoplelimit-meal.spottaken} min="0"/><label>people are going</label>
          </div>

          {!meal.requested ? <button className="meallist_join_button" onClick={()=>this.props.requestWatchedMeal(idx, meal.meal_id, currentuserid, quantity, token)}>join this meal</button> : <button className="meallist_join_button" disabled>already joined</button>}
        </div>
      ):<p>I haven&#39;t watch any meals.</p>}
      </div>
    )
  }
}



const WatchedMealContainer = ReactRedux.connect(state=>state, actions)(WatchedMeal)

export default WatchedMealContainer;
