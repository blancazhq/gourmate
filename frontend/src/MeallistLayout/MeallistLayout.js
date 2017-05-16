import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./MeallistLayout.action";
import {Link, IndexLink} from "react-router";

const MeallistLayout = (props)=>
  <div>
    <div>
      <ul>
        <IndexLink to="/dashboard/meallist"><li>Requested Meals</li></IndexLink>
        <Link to="/dashboard/meallist/watchedmeal"><li>Watched Meals</li></Link>
        <Link to="/dashboard/meallist/approvedmeal"><li>Approved Meals</li></Link>
        <Link to="/dashboard/meallist/purchasedmeal"><li>Purchased Meals</li></Link>
      </ul>
    </div>
    {props.children}
  </div>


const MeallistLayoutContainer = ReactRedux.connect(state=>state, actions)(MeallistLayout)

export default MeallistLayoutContainer;
