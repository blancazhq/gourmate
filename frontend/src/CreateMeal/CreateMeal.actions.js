import $ from "jquery";
import { hashHistory } from "react-router";
const cloudinary = window.cloudinary;
import BASEURL from "../baseurl";

export function initCreateMeal(){
  return {
    type: "initCreateMeal"
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
    let validator = (data)=>{
      let titlevalidator = !!data.introtitle;
      let contentvalidator = !!data.introcontent;
      let datevalidator = data.mealdate ?
      (data.mealdate.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)!==null) : false;
      let timevalidator = data.mealtime ?
      (data.mealtime.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)!==null) : false;
      let addressvalidator = !!data.address;
      let cityvalidator = !!data.city;
      let statevalidator = data.state ?
      (data.state.match(/^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/)) : false;
      let keywordvalidator = data.keyword.every((keyword)=>keyword !== null)
      let coursevalidator =
      data.course.every((course)=>course.name !==null)

      return {
        titlevalidator:titlevalidator,
        contentvalidator:contentvalidator,
        datevalidator:datevalidator,
        timevalidator:timevalidator,
        addressvalidator:addressvalidator,
        cityvalidator:cityvalidator,
        statevalidator:statevalidator,
        keywordvalidator:keywordvalidator,
        coursevalidator:coursevalidator
      }
    }

    if(!validator(data).titlevalidator){
      dispatch({
        type: "titleInvalid"
      })
    }else if(!validator(data).contentvalidator){
      dispatch({
        type: "contentInvalid"
      })
    }else if(!validator(data).datevalidator){
      dispatch({
        type: "dateInvalid"
      })
    }else if(!validator(data).timevalidator){
      dispatch({
        type: "timeInvalid"
      })
    }else if(!validator(data).addressvalidator){
      dispatch({
        type: "addressInvalid"
      })
    }else if(!validator(data).cityvalidator){
      dispatch({
        type: "cityInvalid"
      })
    }else if(!validator(data).statevalidator){
      dispatch({
        type: "stateInvalid"
      })
    }else if(!validator(data).keywordvalidator){
      dispatch({
        type: "notEnoughKeyWord"
      })
    }else if(!validator(data).coursevalidator){
      dispatch({
        type: "notEnoughCourse"
      })
    }else{
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
      .catch((err)=>{
        let error = err.responseJSON && err.responseJSON.message || "there is an error"
        dispatch({
          type: "creatingMealError",
          value: error
        })
      })
    }
  }
}

export function toggleCreateMeal(){
  return {
    type: "toggleCreateMeal"
  }
}
