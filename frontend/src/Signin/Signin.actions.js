import $ from "jquery";
import { hashHistory } from "react-router";

export function usernameChange(event){
  return {
    type: "usernameChange",
    value: event.target.value
  }
}

export function passwordChange(event){
  return {
    type: "passwordChange",
    value: event.target.value
  }
}

export function signIn (username, password) {
  return function(dispatch){
    $.ajax({
      url: "http://localhost:3012/api/user/signin",
      method: "post",
      data: JSON.stringify({
        username: username,
        password: password
      }),
      contentType: "application/json"
    })
    .then((data)=> {
      if(data === "wrong password"){
        dispatch({
          type: "wrongPassword"
        })
      }else if(data === "username doesn't exist"){
        dispatch({
          type: "wrongUsername"
        })
      }else if(data.username){
        dispatch({
          type: "doneSigningIn",
          value: data
        })
        hashHistory.push("/")
      }
    })
  }
}
