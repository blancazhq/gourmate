import React from "react";
import * as ReactRedux from "react-redux";
import * as actions1 from "./Signin.actions"
import * as actions2 from "../AppLayout/AppLayout.action";

class Signin extends React.Component{
  componentDidMount(nextProps){
    if(this.props.signin.signedIn){
      this.props.signOut(this.props.signin.name);
      this.props.clearChat();
    }
  }
  render(){
    return (
        !this.props.signin.signedIn? <div id="signin_wrapper" className="cf">
          <h4>sign in</h4>
          <div id="signin_content_wrapper" className="cf">
            <div id="signin_content_div">
              <div id="signin_input_div">
                <input type="text" value={this.props.signin.username}
                onChange={this.props.signinUsernameChange} placeholder="username"/>
                <input type="password" value={this.props.signin.password}
                onChange={this.props.signinPasswordChange} placeholder="password"/>
              </div>
              <button onClick={()=>{this.props.signIn(this.props.signin.username, this.props.signin.password);this.props.clearChat()}}>Sign in</button>
              <p>{this.props.signin.message}</p>
              <p>{this.props.signin.error}</p>
            </div>
          </div>
          <div id="signin_decor">
          </div>
        </div> : <p>{this.props.signin.message}</p>
    )
  }
}

const SigninContainer = ReactRedux.connect(state=>state, Object.assign({},actions1,actions2))(Signin)

export default SigninContainer
