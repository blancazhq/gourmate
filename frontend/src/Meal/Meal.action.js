import $ from "jquery";
import {hashHistory} from "react-router"

export const getSingleMealData = (id)=> {
  return (dispatch)=>{
    $.ajax({
      url: "http://localhost:3012/api/meals/"+id,
      method: "get"
    })
    .then((data)=>{
      dispatch({
        type: "getSingleMealData",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getSingleMealDataError",
        value: error
      })
    })
  }
}

export const quantityChange = (event) => ({
  type: "quantityChange",
  value: event.target.value
})

export const requestMeal = (mealid, userid, quantity, token)=>{
  return (dispatch)=> {
    $.ajax({
      url: "http://localhost:3012/api/requestmeal",
      method: "post",
      data: JSON.stringify({
        mealid: mealid,
        quantity: quantity,
        userid: userid,
        token: token
      }),
      contentType:" application/json"
    })
    .then((data)=>{
      if(data.meal_id === Number(mealid) && data.user_id === userid){
        dispatch({
          type: "completeAddToShoppingcart",
          value: data
        })
      }
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "addToShoppingcartError",
        value: error
      })
    })
  }
}

export const toggleReview = () =>({
  type: "toggleReview"
})

export const reviewTitleChange = (event) => ({
  type: "reviewTitleChange",
  value: event.target.value
})

export const reviewContentChange = (event) => ({
  type: "reviewContentChange",
  value: event.target.value
})

export function uploadReviewPicture(event){
  return function(dispatch){
    window.cloudinary.openUploadWidget({ cloud_name: 'dpcq8lowe', upload_preset: 'hykaf5ji',max_file_size: 750000},
      function(error, result) {
        if(result !== undefined){
          let urls = []
          result.forEach((result)=>{
            urls.push(result.url)
          })
          dispatch({
            type: "uploadReviewPictureComplete",
            value: urls
          })
        }else{
          dispatch({
            type: "uploadReviewPictureError",
            value: error.message
          })
        }
      });
  }
}

export const submitReview = (title, content, userid, mealid, imgs, token) => {
  return (dispatch)=> {
   $.ajax({
     url: "http://localhost:3012/api/review",
     method: "post",
     data: JSON.stringify({
       title: title,
       content: content,
       mealid: mealid,
       userid: userid,
       imgs: imgs,
       token: token
     }),
     contentType:" application/json"
   })
   .then((data)=>{
     if(data = "done inserting review"){
       dispatch({
         type: "completeAddReview"
       })
       $.ajax({
         url: "http://localhost:3012/api/meals/"+mealid,
         method: "get"
       })
       .then((data)=>{
         dispatch({
           type: "getSingleMealData",
           value: data
         })
       })
     }
   })
   .catch((err)=>{
     let error = err.responseJSON && err.responseJSON.message || "there is an error"
     dispatch({
       type: "addReviewError",
       value: error
     })
   })
 }
}
