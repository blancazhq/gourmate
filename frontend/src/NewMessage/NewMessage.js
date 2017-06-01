import React from "react";
import * as ReactRedux from "react-redux";
import * as actions1 from "./NewMessage.action"
import * as actions2 from "../Inbox/Inbox.action"
import {Link} from "react-router";

class NewMessage extends React.Component {
  reply() {
    let senderid = this.props.signin.id;
    let title = this.props.newmessage.messagetitle;
    let content = this.props.newmessage.messagecontent;
    let token = this.props.signin.token;
    let replyid = this.props.inbox.replyid;
    let receiverid = this.props.newmessage.receiverid;

    if(replyid){
      this.props.sendMessage(title, content, senderid, replyid, token);
      this.props.clearReply();
    }else{
      this.props.sendMessage(title, content, senderid, receiverid, token)
    }
  }

  render(){
    let replyid = this.props.inbox.replyid;
    let replyname = this.props.inbox.replyname;
    let nametemp = this.props.newmessage.receivernametemp;
    let candidates = this.props.newmessage.namecandidates;
    let receiverid = this.props.newmessage.receiverid;
    let senderid = this.props.signin.id;
    let title = this.props.newmessage.messagetitle;
    let content = this.props.newmessage.messagecontent;
    let token = this.props.signin.token;

    return(
      <div id="new_message_wrapper">
        <label>To:</label>

        <input value={replyid ? replyname:nametemp} onChange={(event)=>  this.props.messageNameChange(event, nametemp)}/>

        {(candidates && nametemp.length>1 && !receiverid) ? <div id="new_message_candidate_div">
          {candidates.map((candidate)=><div className="new_message_candidate_unit_div cf">
            <img src={candidate.imgurl} onClick={()=>this.props.selectCandidate(candidate.id, candidate.name)}/>
            <p className="new_message_candidate_name">{candidate.name}</p>
            <p className="new_message_candidate_title"> - {candidate.intro_title}</p>
          </div>)}
        </div>:null}

        <label>Title:</label>
        <input value={this.props.newmessage.title}onChange={this.props.messageTitleChange}/>

        <label>Content:</label>
        <textarea rows="4" cols="50" value={this.props.newmessage.content}onChange={this.props.messageContentChange}/>

        <button onClick={()=>this.reply()}>send</button>
      </div>
    )
  }
}

const NewMessageContainer = ReactRedux.connect(state=>state, Object.assign({}, actions1, actions2))(NewMessage)

export default NewMessageContainer;
