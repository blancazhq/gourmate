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
    return(
      <div>
      <h2>Inbox</h2>
      <Link to="/dashboard/message/newmessage"><button>new message</button></Link>
      {data? data.map((message, idx)=>
        <div>
          <p>{message.title}</p>
          <Link to={"/user/"+message.sender_id}><p>{message.sender_name}</p></Link>
          {message.show_content ?<button onClick={()=>this.props.toggleContent(idx)}>hide content</button>:<button onClick={()=>this.props.toggleContent(idx)}>show content</button>}
          {message.show_content ? <p>{message.content}</p> : null}
        </div>
      ):null}
      </div>
    )
  }
}



const InboxContainer = ReactRedux.connect(state=>state, actions)(Inbox)

export default InboxContainer;
