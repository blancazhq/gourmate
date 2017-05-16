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
      <div>
      <h2>Hosted Meal</h2>
      {data? data.map((meal, idx)=>
        <div>
          <Link to={"/meal/"+meal.id}><p>{meal.title}</p></Link>
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


const HostedMealContainer = ReactRedux.connect(state=>state, actions)(HostedMeal)

export default HostedMealContainer;
