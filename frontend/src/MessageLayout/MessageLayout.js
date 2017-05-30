import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "../Dashboard/Dashboard.action";
import {Link, IndexLink} from "react-router";

class MessageLayout extends React.Component{

  render(){
    return (
      <div>
        {this.props.dashboard.showMessageMenu || this.props.applayout.width>500 ? <div className="dashboard_nav">
          <ul className="dashboard_nav_ul">
            <IndexLink className="dashboard_nav_link" to="/dashboard/message/"><li onClick={this.props.toggleMessageMenu} className="dashboard_nav_li">Inbox</li></IndexLink>
            <Link to="/dashboard/message/sent" className="dashboard_nav_link"><li onClick={this.props.toggleMessageMenu} className="dashboard_nav_li">Sent</li></Link>
          </ul>
        </div> : null}
        <div className="dashboard_div">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const MessageLayoutContainer = ReactRedux.connect(state=>state, actions)(MessageLayout)

export default MessageLayoutContainer;
