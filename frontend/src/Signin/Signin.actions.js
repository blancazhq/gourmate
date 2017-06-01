import $ from "jquery";
import { hashHistory } from "react-router";
import BASEURL from "../baseurl";
import socket from "../socket"

export function signOut(name){
  return function(dispatch){
    socket.emit("sign out", name)
    dispatch({
      type: "signOut"
    })
  }
}

export function signinUsernameChange(event){
  return {
    type: "signinUsernameChange",
    value: event.target.value
  }
}

export function signinPasswordChange(event){
  return {
    type: "signinPasswordChange",
    value: event.target.value
  }
}

export function signIn (username, password) {
  return function(dispatch){
    $.ajax({
      url: `${BASEURL}/api/user/signin`,
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
      }else if(data === "user not found"){
        dispatch({
          type: "wrongUsername"
        })
      }else if(data.username){
        socket.emit("change name", data.name)
        dispatch({
          type: "doneSigningIn",
          value: data
        })
        hashHistory.push("/")
      }
    })
  }
}
