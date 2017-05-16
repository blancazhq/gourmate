import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./ManageRequest.action"
import {Link} from "react-router";

class ManageRequest extends React.Component {
  componentDidMount(){
    this.props.getManageRequestData(this.props.signin.id, this.props.signin.token);
  }
  render(){
    let data = this.props.managerequest.data;
    let token = this.props.signin.token
    return(
      <div>
      <h2>Manage Request</h2>

      {data? data.map((request, idx)=>
        <div>
          <Link to={"/meal/"+request.meal_id}><p>{request.title}</p></Link>
          <p>{request.mealdate.slice(0, request.mealdate.indexOf("T"))}</p>
          <p>{request.mealtime}</p>
          <p>name: {request.name}</p>
          <p>party of: {request.quantity}</p>
          <img src={request.imgurl} alt={request.name} width="100px"/>
          {request.approved === "not approved" ?<div>
          <button onClick={()=>this.props.acceptRequest(idx, request.meal_id, request.user_id, token)}>accept</button>
          <button onClick={()=>this.props.declineRequest(idx, request.meal_id, request.user_id, token)}>decline</button>
          </div>:(request.approved === "approved" ? <p>You already approved this request</p>: <p>You already declined this request</p>)}
        </div>
      ):null}
      </div>
    )
  }
}

const ManageRequestContainer = ReactRedux.connect(state=>state, actions)(ManageRequest)

export default ManageRequestContainer;
