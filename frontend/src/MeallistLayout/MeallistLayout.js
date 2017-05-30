import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "../Dashboard/Dashboard.action";
import {Link, IndexLink} from "react-router";

const MeallistLayout = (props)=>
  <div>
    {props.dashboard.showMeallistMenu || this.props.applayout.width>500 ? <div className="dashboard_nav">
      <ul className="dashboard_nav_ul">
        <IndexLink className="dashboard_nav_link" to="/dashboard/meallist"><li onClick={props.toggleMeallistMenu} className="dashboard_nav_li">Requested Meals</li></IndexLink>
        <Link className="dashboard_nav_link" to="/dashboard/meallist/watchedmeal"><li onClick={props.toggleMeallistMenu} className="dashboard_nav_li">Watched Meals</li></Link>
        <Link className="dashboard_nav_link" to="/dashboard/meallist/approvedmeal"><li onClick={props.toggleMeallistMenu} className="dashboard_nav_li">Approved Meals</li></Link>
        <Link className="dashboard_nav_link" to="/dashboard/meallist/purchasedmeal"><li onClick={props.toggleMeallistMenu} className="dashboard_nav_li">Purchased Meals</li></Link>
      </ul>
    </div> :null}
    <div className="dashboard_div">
      {props.children}
    </div>
  </div>


const MeallistLayoutContainer = ReactRedux.connect(state=>state, actions)(MeallistLayout)

export default MeallistLayoutContainer;
