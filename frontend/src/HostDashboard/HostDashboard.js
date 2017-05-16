import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./HostDashboard.action";
import {Link, IndexLink} from "react-router";

const HostDashboard = (props)=>
  <div>
    <div>
      <ul>
        <IndexLink to="/dashboard/hostdashboard"><li>hosted meals</li></IndexLink>
        <Link to="/dashboard/hostdashboard/createmeal"><li>create a meal</li></Link>
        <Link to="/dashboard/hostdashboard/managerequest"><li>manage join requests</li></Link>
      </ul>
    </div>
    {props.children}
  </div>


const HostDashboardContainer = ReactRedux.connect(state=>state, actions)(HostDashboard)

export default HostDashboardContainer;
