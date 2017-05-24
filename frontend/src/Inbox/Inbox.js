import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Inbox.action"
import {Link} from "react-router";

class Inbox extends React.Component {
  componentDidMount(){
    this.props.getInboxData(this.props.signin.id, this.props.signin.token);
  }
  render(){
    let data = this.props.inbox.data;
    let token = this.props.signin.token;
    return(
      <div className="message_wrapper">
        <div className="message_title_div">
          <h2>Inbox</h2>
          <Link to="/dashboard/message/newmessage"><img className="new_message_button" src="images/new_message.png"/></Link>
        </div>
        <div className="message_content_div">
          {data? data.map((message, idx)=>
            <div className="message_content_unit_div cf">
              <div className="message_content_unit">
                <Link className={message.is_read ? "message_content_name_read":"message_content_name_unread"} to={"/user/"+message.sender_id}><p>{message.sender_name}</p></Link>
                <p className="message_content_unit_title">{message.messagetitle}</p>
                {message.show_content ? <p className="message_content_unit_content">{message.messagecontent}{message.related_meal_id ? <Link to={"/meal/"+message.related_meal_id}>{message.mealtitle}</Link> : null}</p> : null}
              </div>
              <div className="message_content_unit_button">
                {message.show_content ?<button onClick={()=>this.props.toggleContent(idx, message.id, token)}>hide content</button>:<button onClick={()=>this.props.toggleContent(idx, message.id, token)}>show content</button>}
                <Link className="reply_button_link" to="/dashboard/message/newmessage"><button onClick={()=>this.props.reply(message.sender_id, message.sender_name)}>reply</button></Link>
              </div>
            </div>
          ):null}
        </div>
      </div>
    )
  }
}



const InboxContainer = ReactRedux.connect(state=>state, actions)(Inbox)

export default InboxContainer;
