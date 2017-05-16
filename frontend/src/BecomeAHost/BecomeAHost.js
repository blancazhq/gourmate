import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./BecomeAHost.actions"

class BecomeAHost extends React.Component{
  render(){
    let userid = this.props.signin.id;
    let token = this.props.signin.token;

    return (
        <div>
        {this.props.becomeahost.ishost ? <p>{this.props.becomeahost.message}</p> : <button onClick={()=>this.props.becomeAHost(userid, token)}>become a host</button>}
        </div>
    )
  }
}

const BecomeAHostContainer = ReactRedux.connect(state=>state, actions)(BecomeAHost)

export default BecomeAHostContainer
