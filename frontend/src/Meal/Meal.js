import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Meal.action"

const Meal = (props)=>
  <div>
    <div>
      hello
    </div>
  </div>


const MealContainer = ReactRedux.connect(state=>state, actions)(Meal)

export default MealContainer;
