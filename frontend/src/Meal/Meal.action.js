import $ from "jquery";
import {hashHistory} from "react-router"
import BASEURL from "../baseurl";

export const getSingleMealData = (id)=> {
  return (dispatch)=>{
    $.ajax({
      url: BASEURL+"/api/meals/"+id,
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

export const getMealStatus =(userid, mealid, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/mealstatus`,
      method: "get",
      data: {
        userid: userid,
        mealid: mealid,
        token: token
      }
    })
    .then((status)=>{
      dispatch({
        type: "getMealStatus",
        value: status
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getMealStatusError",
        value: error
      })
    })
  }
}

export const unwatchSingleMeal = (userid, mealid, token)=>{
 return (dispatch)=> {
   $.ajax({
     url: `${BASEURL}/api/watchedmeal`,
     method: "delete",
     data: JSON.stringify({
       mealid: mealid,
       userid: userid,
       token: token
     }),
     contentType:" application/json"
   })
   .then((data)=>{
     if(data.meal_id === Number(mealid) && data.user_id === userid){
       dispatch({
         type: "completeUnwatchSingleMeal"
       })
     }
   })
   .catch((err)=>{
     let error = err.responseJSON && err.responseJSON.message || "there is an error"
     dispatch({
       type: "unwatchSingleMealError",
       value: error
     })
   })
 }
}

export const watchSingleMeal = (userid, mealid, token)=>{
 return (dispatch)=> {
   $.ajax({
     url: `${BASEURL}/api/watchedmeal`,
     method: "post",
     data: JSON.stringify({
       mealid: mealid,
       userid: userid,
       token: token
     }),
     contentType:" application/json"
   })
   .then((data)=>{
     if(data.meal_id === Number(mealid) && data.user_id === userid){
       dispatch({
         type: "completeWatchSingleMeal"
       })
     }
   })
   .catch((err)=>{
     let error = err.responseJSON && err.responseJSON.message || "there is an error"
     dispatch({
       type: "watchSingleMealError",
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
      url: `${BASEURL}/api/requestmeal`,
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
          type: "completeRequestMeal",
          value: data
        })
      }
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "requestMealError",
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

export const reviewStarChange = () => ({
  type: "reviewStarChange"
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

export const submitReview = (title, content, userid, mealid, imgs, star, token) => {
  return (dispatch)=> {
   $.ajax({
     url: `${BASEURL}/api/review`,
     method: "post",
     data: JSON.stringify({
       title: title,
       content: content,
       mealid: mealid,
       userid: userid,
       imgs: imgs,
       star: star,
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
         url: BASEURL+"/api/meals/"+mealid,
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
