import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "../Dashboard/Dashboard.action";
import {Link, IndexLink} from "react-router";

const HostDashboard = (props)=>
  <div>
    {props.dashboard.showHostMenu|| this.props.applayout.width>500 ?<div className="dashboard_nav">
      <ul className="dashboard_nav_ul">
        <IndexLink className="dashboard_nav_link" to="/dashboard/hostdashboard"><li onClick={props.toggleHostMenu} className="dashboard_nav_li">hosted meals</li></IndexLink>
        <Link className="dashboard_nav_link" to="/dashboard/hostdashboard/createmeal"><li onClick={props.toggleHostMenu} className="dashboard_nav_li">create a meal</li></Link>
        <Link className="dashboard_nav_link" to="/dashboard/hostdashboard/managerequest"><li onClick={props.toggleHostMenu} className="dashboard_nav_li">manage join requests</li></Link>
      </ul>
    </div>: null}
    <div className="dashboard_div">
      {props.children}
    </div>
  </div>


const HostDashboardContainer = ReactRedux.connect(state=>state, actions)(HostDashboard)

export default HostDashboardContainer;
