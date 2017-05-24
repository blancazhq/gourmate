import $ from "jquery";
import BASEURL from "../baseurl";

export function searchKeywordChange(event){
  return {
    type: "searchKeywordChange",
    value: event.target.value
  }
}

export function searchcityChange(event){
  return {
    type: "searchcityChange",
    value: event.target.value
  }
}

export function searchstateChange(event){
  return {
    type: "searchstateChange",
    value: event.target.value
  }
}

export function getFeaturedMeals(){
  return function(dispatch){
    $.ajax({
      url: `${BASEURL}/api/featuredmeals`,
      method: "get"
    })
    .then((data)=>{
      dispatch({
        type: "completeGetFeaturedMeals",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getFeaturedMealsError",
        value: error
      })
    })
  }
}

export function div1Enter(){
  return {
    type:"div1Enter"
  }
}

export function div2Enter(){
  return {
    type:"div2Enter"
  }
}

export function div3Enter(){
  return {
    type:"div3Enter"
  }
}
