import $ from "jquery";
import {hashHistory} from "react-router";

export const messageNameChange = (event, name)=> {
  return (dispatch)=>{
    dispatch({
      type: "addToNameTemp",
      value: event.target.value
    })
    $.ajax({
      url: "http://localhost:3012/api/finduser",
      method: "get",
      data: {
        name: name
      }
    })
    .then((data)=>{
      dispatch({
        type: "getNames",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getNamesError",
        value: error
      })
    })
  }
}

export const selectCandidate = (id, name) => ({
  type: "selectCandidate",
  id: id,
  name: name
})

export const messageTitleChange = (event) => ({
  type: "messageTitleChange",
  value: event.target.value
})

export const messageContentChange = (event) => ({
  type: "messageContentChange",
  value: event.target.value
})

export const sendMessage = (title, content, senderid, receiverid, token) => {
  console.log(title, content, senderid, receiverid, token)
  return (dispatch) => {
    $.ajax({
      url: "http://localhost:3012/api/message",
      method: "post",
      data: JSON.stringify({
        title: title,
        content: content,
        senderid: senderid,
        receiverid: receiverid,
        token: token
      }),
      contentType: "application/json"
    })
    .then((data)=>{
      console.log(data.receiver_id)
      console.log(receiverid)
      if(data.receiver_id === receiverid){
        dispatch({
          type: "doneSendingMessage"
        })
        hashHistory.push("/dashboard/message/sent")
      }
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getNamesError",
        value: error
      })
    })
  }
}
