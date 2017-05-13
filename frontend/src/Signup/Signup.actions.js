import $ from "jquery";
import { hashHistory } from "react-router";
const cloudinary = window.cloudinary;

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

export function nameChange(event){
  return {
    type: "nameChange",
    value: event.target.value
  }
}
export function addressChange(event){
  return {
    type: "addressChange",
    value: event.target.value
  }
}
export function cityChange(event){
  return {
    type: "cityChange",
    value: event.target.value
  }
}
export function stateChange(event){
  return {
    type: "stateChange",
    value: event.target.value
  }
}
export function phonenumberChange(event){
  return {
    type: "phonenumberChange",
    value: event.target.value
  }
}
export function emailChange(event){
  return {
    type: "emailChange",
    value: event.target.value
  }
}
export function introtitleChange(event){
  return {
    type: "introtitleChange",
    value: event.target.value
  }
}
export function introcontentChange(event){
  return {
    type: "introcontentChange",
    value: event.target.value
  }
}
export function foodpreferenceChange(event){
  return {
    type: "foodpreferenceChange",
    value: event.target.value
  }
}
export function foodrestrictionChange(event){
  return {
    type: "foodrestrictionChange",
    value: event.target.value
  }
}
export function profileimguploadChange(event){
  return function(dispatch){
    cloudinary.openUploadWidget({ cloud_name: 'dpcq8lowe', upload_preset: 'hykaf5ji',max_file_size: 750000},
      function(error, result) {
        if(result !== undefined){
          dispatch({
            type: "profileimguploadComplete",
            value: result[0].url
          })
        }else{
          dispatch({
            type: "profileimguploadError",
            value: error.message
          })
        }
      });
  }
}

export function signUp (data){
  return function(dispatch){
    dispatch({
      type: "startSigningUp"
    })
    $.ajax({
      url: "http://localhost:3012/api/user/signup",
      method: "post",
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .then((data)=>{
      if(data === "done inserting"){
        dispatch({
          type: "doneSigningUp"
        })
        hashHistory.push("/signin")
      }
    })
  }
}
