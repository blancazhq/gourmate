import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./AppLayout.action";
import {Link, IndexLink} from "react-router";

const AppLayout = (props)=>
  <div>
    <div>
      <IndexLink to="/"><h1>Gourmate</h1></IndexLink>
      <ul>
        {props.signup.signedUp || props.signin.signedIn ? null : <Link to="/signup"><li>Sign Up</li></Link>}
        {props.signin.signedIn ? null : <Link to="/signin"><li>Sign In</li></Link>}
        {props.signin.signedIn ? <Link to="/dashboard"><li>Dashboard</li></Link> : null}
      </ul>
      <p>{props.signin.message}</p>
    </div>
    {props.children}
  </div>


const AppLayoutContainer = ReactRedux.connect(state=>state, actions)(AppLayout)

export default AppLayoutContainer;
