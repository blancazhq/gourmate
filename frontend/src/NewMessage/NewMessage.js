import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./NewMessage.action"
import {Link} from "react-router";

class NewMessage extends React.Component {
  render(){
    let nametemp = this.props.newmessage.receivernametemp;
    let candidates = this.props.newmessage.namecandidates;
    let receiverid = this.props.newmessage.receiverid;
    let senderid = this.props.signin.id;
    let title = this.props.newmessage.messagetitle;
    let content = this.props.newmessage.messagecontent;
    let token = this.props.signin.token;

    return(
      <div>
        <label>to:</label><input value={nametemp} onChange={(event)=>  this.props.messageNameChange(event, nametemp)}/>
        {(candidates && nametemp.length>1) ? <div>
          {candidates.map((candidate)=><div>
            <p>{candidate.name}</p>
            <p>{candidate.intro_title}</p>
            <img src={candidate.imgurl} width="100px" onClick={()=>this.props.selectCandidate(candidate.id, candidate.name)}/>
          </div>)}
        </div>:null}
        <label>title:</label><input value={this.props.newmessage.title}onChange={this.props.messageTitleChange}/>
        <label>content:</label><textarea rows="4" cols="50" value={this.props.newmessage.content}onChange={this.props.messageContentChange}/>
        <button onClick={()=>{this.props.sendMessage(title, content, senderid, receiverid, token)}}>send</button>
      </div>
    )
  }
}

const NewMessageContainer = ReactRedux.connect(state=>state, actions)(NewMessage)

export default NewMessageContainer;
