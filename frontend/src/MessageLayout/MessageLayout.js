import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./MessageLayout.action";
import {Link, IndexLink} from "react-router";

const MessageLayout = (props)=>
  <div>
    <div>
      <ul>
        <IndexLink to="/dashboard/message/"><li>Inbox</li></IndexLink>
        <Link to="/dashboard/message/sent"><li>Sent</li></Link>
      </ul>
    </div>
    {props.children}
  </div>


const MessageLayoutContainer = ReactRedux.connect(state=>state, actions)(MessageLayout)

export default MessageLayoutContainer;
