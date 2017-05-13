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
      <div>
      <h2>Sent</h2>
      <Link to="/dashboard/message/newmessage"><button>new message</button></Link>
      {data? data.map((message, idx)=>
        <div>
          <p>{message.title}</p>
          <Link to={"/user/"+message.receiver_id}><p>{message.receiver_name}</p></Link>
          {message.show_content ?<button onClick={()=>this.props.toggleSentContent(idx)}>hide content</button>:<button onClick={()=>this.props.toggleSentContent(idx)}>show content</button>}
          {message.show_content ? <p>{message.content}</p> : null}
        </div>
      ):null}
      </div>
    )
  }
}



const SentContainer = ReactRedux.connect(state=>state, actions)(Sent)

export default SentContainer;
