import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./User.action"

const User = (props)=>
  <div>
    <div>
      hello
    </div>
  </div>


const UserContainer = ReactRedux.connect(state=>state, actions)(User)

export default UserContainer;
