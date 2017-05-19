import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./MessageLayout.action";
import {Link, IndexLink} from "react-router";

const MessageLayout = (props)=>
  <div>
    <div id="message_nav">
      <ul id="message_nav_ul">
        <IndexLink className="message_nav_link" to="/dashboard/message/"><li>Inbox</li></IndexLink>
        <Link to="/dashboard/message/sent" className="message_nav_link"><li>Sent</li></Link>
      </ul>
    </div>
    <div id="message_div">
      {props.children}
    </div>
  </div>


const MessageLayoutContainer = ReactRedux.connect(state=>state, actions)(MessageLayout)

export default MessageLayoutContainer;
