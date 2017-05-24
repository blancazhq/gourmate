import $ from "jquery";
import { hashHistory } from "react-router";
const cloudinary = window.cloudinary;
import BASEURL from "../baseurl";

export function usernameChange(event){
  return function(dispatch){
    let username = event.target.value
    $.ajax({
      url: BASEURL+"/api/usernamevalidate",
      method: "get",
      data: {
        username: event.target.value
      }
    })
    .then((data)=>{
      let isValid = false;
      if(data==="username is occupied" || !username){
        isValid = false;
      }else{
        isValid = true;
      }
      dispatch({
        type: "usernameChange",
        value: username,
        validator: isValid
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "usernameValidationError",
        value: error
      })
    })
  }
}

export function passwordChange(event){
  return function(dispatch){
    let password = event.target.value;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    let isValid = !!password.match(regex);
      dispatch({
        type: "passwordChange",
        value: password,
        validator: isValid
      })
  }
}

export function phonenumberChange(event){
  return function(dispatch){
    let phonenumber = event.target.value;

    function telephoneCheck(str) {
      var re = /(1)?( )?(\()?\d{3}(\))?( )?(-)?\d{3}( )?(-)?\d{4}/g
      var found = str.match(re);
      function parenthesesTest(str){
        var result = true;
        for(var i=0;i<str.length;i++){
          var slice1 = str.slice(i, i+1);
          var slice2 = str.slice(i+4, i+5);
          if(slice1 === "(" && slice2 !== ")"){
            result = false;
          }else if(slice1 === ")" && i===3){
            result = false;
          }else if(slice2 === ")" && slice1 !== "("){
            result = false;
          }
        }
        return result;
      }
      if(found!==null && found[0] === str && parenthesesTest(str)===true){
        return true;
      }else{
        return false;
      }
    }

    let isValid = telephoneCheck(phonenumber);

      dispatch({
        type: "phonenumberChange",
        value: phonenumber,
        validator: isValid
      })
  }
}

export function emailChange(event){
  return function(dispatch){
    let email = event.target.value;
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isValid = !!email.match(regex);
      dispatch({
        type: "emailChange",
        value: email,
        validator: isValid
      })
  }
}

export function stateChange(event){
  return function(dispatch){
    let state = event.target.value;
    let regex = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
    let isValid = !!state.match(regex);
      dispatch({
        type: "stateChange",
        value: state,
        validator: isValid
      })
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
      url: `${BASEURL}/api/user/signup`,
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
