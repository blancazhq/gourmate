import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Signin.actions"


const Signin = (props) =>
  !props.signedIn? <div>
    <p>sign in</p>
    <label>username</label><input type="text" value={props.username}
    onChange={props.usernameChange}/>
    <label>password</label><input type="password" value={props.password}
    onChange={props.passwordChange}/>
    <button onClick={()=>props.signIn(props.username, props.password)}>SignIn</button>
    <p>{props.message}</p>
    <p>{props.error}</p>
  </div> : <p>{props.message}</p>

const SigninContainer = ReactRedux.connect(state=>state.signin, actions)(Signin)

export default SigninContainer
