import $ from "jquery";

export const getSentData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: "http://localhost:3012/api/message/sent",
      method: "get",
      data: {
        id: id,
        token: token
      }
    })
    .then((data)=>{
      console.log(data)
      data.forEach((message)=>{
        console.log(message)
        message.show_content = false
      })
      dispatch({
        type: "getSentData",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getSentDataError",
        value: error
      })
    })
  }
}

export const toggleSentContent = (idx)=>({
  type: "toggleSentContent",
  idx:idx
})
