import $ from "jquery";
import BASEURL from "../baseurl";

export const getSentData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/message/sent`,
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
