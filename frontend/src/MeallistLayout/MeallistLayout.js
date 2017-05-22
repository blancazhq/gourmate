import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./MeallistLayout.action";
import {Link, IndexLink} from "react-router";

const MeallistLayout = (props)=>
  <div>
    <div id="meallist_nav">
      <ul id="meallist_nav_ul">
        <IndexLink className="meallist_nav_link" to="/dashboard/meallist"><li>Requested Meals</li></IndexLink>
        <Link className="meallist_nav_link" to="/dashboard/meallist/watchedmeal"><li>Watched Meals</li></Link>
        <Link className="meallist_nav_link" to="/dashboard/meallist/approvedmeal"><li>Approved Meals</li></Link>
        <Link className="meallist_nav_link" to="/dashboard/meallist/purchasedmeal"><li>Purchased Meals</li></Link>
      </ul>
    </div>
    <div id="meallist_div">
      {props.children}
    </div>
  </div>


const MeallistLayoutContainer = ReactRedux.connect(state=>state, actions)(MeallistLayout)

export default MeallistLayoutContainer;
