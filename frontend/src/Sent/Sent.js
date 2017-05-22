import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Sent.action"
import {Link} from "react-router";

class Sent extends React.Component {
  componentDidMount(){
    this.props.getSentData(this.props.signin.id, this.props.signin.token);
  }
  render(){
    let data = this.props.sent.data;
    return(
      <div className="message_wrapper">
        <div className="message_title_div">
          <h2>Sent</h2>
          <Link to="/dashboard/message/newmessage"><img className="new_message_button" src="images/new_message.png"/></Link>
        </div>
        <div className="message_content_div">
        {data? data.map((message, idx)=>
          <div className="message_content_unit_div cf">
            <div className="message_content_unit">
              <Link className="message_content_name_read" to={"/user/"+message.receiver_id}><p>{message.receiver_name}</p></Link>
              <p>{message.title}</p>
              {message.show_content ? <p className="message_content_unit_content">{message.content}</p> : null}
            </div>
            <div className="message_content_unit_button">
              {message.show_content ?<button onClick={()=>this.props.toggleSentContent(idx)}>hide content</button>:<button onClick={()=>this.props.toggleSentContent(idx)}>show content</button>}
            </div>
          </div>
        ):null}
      </div>
      </div>
    )
  }
}



const SentContainer = ReactRedux.connect(state=>state, actions)(Sent)

export default SentContainer;
