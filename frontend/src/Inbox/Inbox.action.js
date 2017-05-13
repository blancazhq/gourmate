import $ from "jquery";

export const getInboxData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: "http://localhost:3012/api/message/inbox",
      method: "get",
      data: {
        id: id,
        token: token
      }
    })
    .then((data)=>{
      data.forEach((message)=>{
        message.show_content = false
      })
      dispatch({
        type: "getInboxData",
        value: data
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

export const toggleContent = (idx)=>({
  type: "toggleContent",
  idx:idx
})
