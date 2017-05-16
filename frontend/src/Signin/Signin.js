import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Signin.actions"

class Signin extends React.Component{
  componentDidMount(nextProps){
    if(this.props.signin.signedIn){
      this.props.signOut()
    }
  }
  render(){
    return (
        !this.props.signin.signedIn? <div>
          <p>sign in</p>
          <label>username</label><input type="text" value={this.props.signin.username}
          onChange={this.props.signinUsernameChange}/>
          <label>password</label><input type="password" value={this.props.signin.password}
          onChange={this.props.signinPasswordChange}/>
          <button onClick={()=>this.props.signIn(this.props.signin.username, this.props.signin.password)}>SignIn</button>
          <p>{this.props.signin.message}</p>
          <p>{this.props.signin.error}</p>
        </div> : <p>{this.props.signin.message}</p>
    )
  }
}

const SigninContainer = ReactRedux.connect(state=>state, actions)(Signin)

export default SigninContainer
