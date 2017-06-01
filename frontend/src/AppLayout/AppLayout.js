import React from "react";
import * as ReactRedux from "react-redux";
import * as actions1 from "../Inbox/Inbox.action";
import * as actions2 from "../AppLayout/AppLayout.action";
import {Link, IndexLink} from "react-router";
import { bindActionCreators } from 'redux';
import ReactResizeDetector from 'react-resize-detector';

import socket from "../socket"

class AppLayout extends React.Component {
  componentDidMount(){
    setTimeout(()=>{
      if(this.props.signin.id){
        this.props.getInboxData(this.props.signin.id, this.props.signin.token);
        this.props.socketJoin(this.props.signin.name);
      }
    }, 500)

    socket.on('chat message', (msg)=>{this.props.receiveChat(msg), this.chatdiv.scrollTop = this.chatdiv.scrollHeight}
    );

    socket.on('join', (array)=>this.props.receiveJoin(array, this.props.signin.name));

    socket.on('typing', this.props.receiveTyping);

    socket.on('leave', this.props.receiveLeave);
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
          <img onClick={props.toggleNav} id="menu_icon" src="images/menu.png"/>
          <ul id="main_menu" className={props.applayout.showNav|| props.applayout.width>500? "main_menu_show": "main_menu_hide"}>
            {props.signin.signedIn ? <li id="welcome_message">{props.signin.message}</li> : null}
            {props.signup.signedUp || props.signin.signedIn ? null : <Link className="main_menu_link" to="/signup"><li onClick={props.toggleNav}>Sign Up</li></Link>}
            {props.signin.signedIn ? <Link className="main_menu_link" to="/signin"><li onClick={props.toggleNav}>Sign Out</li></Link> : <Link className="main_menu_link" to="/signin"><li onClick={props.toggleNav}>Sign In</li></Link>}
            {props.signin.signedIn ? <Link className="main_menu_link" to="/dashboard/message"><li onClick={props.toggleNav}>Message {props.inbox.hasUnreadMessage ? <img id="unread_message_notification" src="images/red_dot.png"/> : null}</li></Link> : null}
            {props.signin.signedIn ? <Link className="main_menu_link" to="/dashboard"><li onClick={props.toggleNav}>Dashboard</li></Link> : null}
          </ul>
        </div>
        {props.applayout.showChat && props.signin.id ? <div id="chat_div">
          <p id="online">online: <span>{this.props.signin.name}</span>{this.props.applayout.people? this.props.applayout.people.map((person)=><span> {person.name}</span>) : null}</p>
          <div id="chat_display_div" ref={div=>this.chatdiv=div}>
            <ul>
              {props.applayout.chatmessage ? props.applayout.chatmessage.map(message=><li>{message}</li>) : null}
            </ul>
          </div>
          <div id="chat_input_div">
            <p>to: </p>
            <select value={props.chatto} onChange={props.chattoChange} id="to">
              <option value="all">all</option>
              {props.applayout.people ? props.applayout.people.map((person)=><option value={person.name}>{person.name}</option>) : null}
            </select>
            <input type="text" value={props.applayout.chatinput} onChange={props.chatinputChange}/>
            <button onClick={()=>props.socketSend(props.applayout.chatinput,props.applayout.chatto)}>send</button>
          </div>
        </div>:null}
        {this.props.signin.id ? <p onClick={props.toggleChat} id="chat_button">{props.applayout.showChat ? "hide chat" : "chat"}</p>: null}
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
        <ReactResizeDetector handleWidth handleHeight onResize={props.handleResize} />
      </div>
    )
  }
}


const AppLayoutContainer = ReactRedux.connect(
  state=>state,
  Object.assign({},actions1,actions2)
)(AppLayout)

export default AppLayoutContainer;
