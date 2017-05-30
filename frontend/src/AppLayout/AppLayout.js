import React from "react";
import * as ReactRedux from "react-redux";
import * as actions1 from "../Inbox/Inbox.action";
import * as actions2 from "../AppLayout/AppLayout.action";
import {Link, IndexLink} from "react-router";
import { bindActionCreators } from 'redux';

class AppLayout extends React.Component {
  componentDidMount(){
    setTimeout(()=>{
      if(this.props.signin.id){
        this.props.getInboxData(this.props.signin.id, this.props.signin.token)
      }
    }, 500)
  }
  componentWillReceiveProps(newProps){
    if(newProps.signin.id!==null && newProps.signin.id !== this.props.signin.id){
      this.props.getInboxData(newProps.signin.id, newProps.signin.token);
    }
  }

  render(){
    let props = this.props;
    return (
      <div id="applayout_wrapper">
        <div id="main_nav" className="cf">
          <div id="logo_wrapper">
            <IndexLink to="/"><img src="images/logo.png"/></IndexLink>
          </div>
          <img onClick={this.props.toggleNav} id="menu_icon" src="images/menu.png"/>
          <ul id="main_menu" className={props.applayout.showNav? "main_menu_show": "main_menu_hide"}>
            {props.signin.signedIn ? <li id="welcome_message">{props.signin.message}</li> : null}
            {props.signup.signedUp || props.signin.signedIn ? null : <Link className="main_menu_link" to="/signup"><li>Sign Up</li></Link>}
            {props.signin.signedIn ? <Link className="main_menu_link" to="/signin"><li>Sign Out</li></Link> : <Link className="main_menu_link" to="/signin"><li>Sign In</li></Link>}
            {props.signin.signedIn ? <Link className="main_menu_link" to="/dashboard/message"><li>Message {props.inbox.hasUnreadMessage ? <img id="unread_message_notification" src="images/red_dot.png"/> : null}</li></Link> : null}
            {props.signin.signedIn ? <Link className="main_menu_link" to="/dashboard"><li>Dashboard</li></Link> : null}
          </ul>
        </div>
        <div id="chat_div">
          <div id="chat_display_div">
            <ul>
            </ul>
          </div>
          <div id="chat_input_div">
            <input type="text"/>
            <button>send</button>
          </div>
        </div>
        <div id="app_layout_children_div">
          {props.children}
        </div>
        <div id="footer" className="cf">
          <p>	&#169; Gourmate. Inc</p>
          <ul>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    )
  }
}


const AppLayoutContainer = ReactRedux.connect(
  state=>state,
  Object.assign({},actions1,actions2)
)(AppLayout)

export default AppLayoutContainer;
