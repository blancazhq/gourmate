import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./HostDashboard.action";
import {Link, IndexLink} from "react-router";

const HostDashboard = (props)=>
  <div>
    <div id="host_dashboard_nav">
      <ul id="host_dashboard_nav_ul">
        <IndexLink className="host_dashboard_nav_link" to="/dashboard/hostdashboard"><li>hosted meals</li></IndexLink>
        <Link className="host_dashboard_nav_link" to="/dashboard/hostdashboard/createmeal"><li>create a meal</li></Link>
        <Link className="host_dashboard_nav_link" to="/dashboard/hostdashboard/managerequest"><li>manage join requests</li></Link>
      </ul>
    </div>
    <div id="host_dashboard_div">
      {props.children}
    </div>
  </div>


const HostDashboardContainer = ReactRedux.connect(state=>state, actions)(HostDashboard)

export default HostDashboardContainer;
