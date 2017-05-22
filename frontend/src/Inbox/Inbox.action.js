import $ from "jquery";
import BASEURL from "../baseurl";

export const getInboxData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/message/inbox`,
      method: "get",
      data: {
        id: id,
        token: token
      }
    })
    .then((data)=>{
      var hasUnreadMessage = data.some((message)=>!message.is_read)
      dispatch({
        type: "getInboxData",
        value: data,
        hasUnreadMessage: hasUnreadMessage
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getInboxDataError",
        value: error
      })
    })
  }
}

export const toggleContent = (idx, messageid, token)=>{
  return (dispatch)=> {
    $.ajax({
      url: `${BASEURL}/api/message/read`,
      method: "post",
      data: JSON.stringify({
        messageid: messageid,
        token: token
      }),
      contentType: "application/json"
    })
    .then((data)=>{
      if(data.id === messageid){
        dispatch({
          type: "toggleContent",
          idx:idx
        })
      }
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "toggleContentError",
        value: error
      })
    })
  }
}

export const reply = (id, name) =>({
  type: "reply",
  id: id,
  name: name
})
