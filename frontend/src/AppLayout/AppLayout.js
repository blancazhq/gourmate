import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./AppLayout.action"

const AppLayout = (props)=>
  <div>
    <div>
      <h1>Gourmate</h1>
    </div>
    {props.children}
  </div>


const AppLayoutContainer = ReactRedux.connect(state=>state, actions)(AppLayout)

export default AppLayoutContainer;
