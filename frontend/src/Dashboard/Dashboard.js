import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Dashboard.action";
import {Link, IndexLink} from "react-router";

class Dashboard extends React.Component {
  render(){
    return (
      <div>
        <ul>
          <IndexLink to={"/dashboard"}><li>Profile</li></IndexLink>
          <Link to={"/dashboard/message"}><li>Message</li></Link>
          <Link to={"/dashboard/meallist"}><li>Meal List</li></Link>
          <Link to={"/dashboard/becomeahost"}><li>Become a Host</li></Link>
          <Link to={"/dashboard/hostdashboard"}><li>Host Dashboard</li></Link>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

const DashboardContainer = ReactRedux.connect(state=>state, actions)(Dashboard)

export default DashboardContainer;
