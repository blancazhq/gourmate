import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./AppLayout.action";
import {Link, IndexLink} from "react-router";

const AppLayout = (props)=>
  <div>
    <div id="main_nav" className="cf">
      <div id="logo_wrapper">
        <IndexLink to="/"><img src="images/logo.png"/></IndexLink>
      </div>
      <ul id="main_menu">
        {props.signin.signedIn ? <li>{props.signin.message}</li> : null}
        {props.signup.signedUp || props.signin.signedIn ? null : <Link className="main_menu_link" to="/signup"><li>Sign Up</li></Link>}
        {props.signin.signedIn ? <Link className="main_menu_link" to="/signin"><li>Sign Out</li></Link> : <Link className="main_menu_link" to="/signin"><li>Sign In</li></Link>}
        {props.signin.signedIn ? <Link className="main_menu_link" to="/dashboard"><li>Dashboard</li></Link> : null}
      </ul>
    </div>
    {props.children}
  </div>


const AppLayoutContainer = ReactRedux.connect(state=>state, actions)(AppLayout)

export default AppLayoutContainer;
