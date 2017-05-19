import $ from "jquery";
import { hashHistory } from "react-router";
import BASEURL from "../baseurl";

export function becomeAHost (userid, token) {
  return function(dispatch){
    $.ajax({
      url: `${BASEURL}/api/becomeahost`,
      method: "post",
      data: JSON.stringify({
        userid: userid,
        token: token
      }),
      contentType: "application/json"
    })
    .then((data)=> {
      if(data.id === userid){
        dispatch({
          type: "completeBecomeAHost"
        })
      }
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "becomeAHostError",
        value: error
      })
    })
  }
}
