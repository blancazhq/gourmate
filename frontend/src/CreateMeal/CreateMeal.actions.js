import $ from "jquery";
import { hashHistory } from "react-router";
const cloudinary = window.cloudinary;
import BASEURL from "../baseurl";

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

export function mealdateChange(event){
  return {
    type: "mealdateChange",
    value: event.target.value
  }
}

export function mealtimeChange(event){
  return {
    type: "mealtimeChange",
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
export function priceChange(event){
  return {
    type: "priceChange",
    value: event.target.value
  }
}
export function peoplelimitChange(event){
  return {
    type: "peoplelimitChange",
    value: event.target.value
  }
}

export function keywordChange(event, idx){
  return {
    type: "keywordChange",
    value: event.target.value,
    idx: idx
  }
}

export function coursenameChange(event, idx){
  return {
    type: "coursenameChange",
    value: event.target.value,
    idx: idx
  }
}

export function coursedescriptionChange(event, idx){
  return {
    type: "coursedescriptionChange",
    value: event.target.value,
    idx: idx
  }
}

export function coursetypeChange(event, idx){
  return {
    type: "coursetypeChange",
    value: event.target.value,
    idx: idx
  }
}

export function addKeyword(){
  return {
    type: "addKeyword"
  }
}

export function addCourse(){
  return {
    type: "addCourse"
  }
}

export function mealimguploadChange(event){
  return function(dispatch){
    cloudinary.openUploadWidget({cloud_name: 'dpcq8lowe', upload_preset: 'hykaf5ji',max_file_size: 750000},
      function(error, result) {
        if(result !== undefined){
          let urls = []
          result.forEach((result)=>{
            urls.push(result.url)
          })
          dispatch({
            type: "mealimguploadComplete",
            value: urls
          })
        }else{
          dispatch({
            type: "mealimguploadError",
            value: error.message
          })
        }
      });
  }
}

export function createMeal(data){
  return function(dispatch){
    $.ajax({
      url: `${BASEURL}/api/createmeal`,
      method: "post",
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .then((data)=>{
      if(data === "done inserting"){
        dispatch({
          type: "doneCreatingMeal"
        })
      }
    })
  }
}
