import $ from "jquery";

export const getWatchedMealData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: "http://localhost:3012/api/watchedmeal",
      method: "get",
      data: {
        id: id,
        token: token
      }
    })
    .then((data)=>{
      data.forEach((meal)=>{
        meal.requested = false;
        meal.watched = true;
      })
      dispatch({
        type: "getWatchedMealData",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getWatchedMealDataError",
        value: error
      })
    })
  }
}

export const watchedMealQuantityChange = (event)=>({
  type: "watchedMealQuantityChange",
  value: event.target.value
})

export const requestWatchedMeal = (idx, mealid, userid, quantity, token)=>{
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
          type: "completeRequestWatchedMeal",
          idx: idx
        })
      }
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "requestWatchedMealError",
        value: error
      })
    })
  }
}

export const unwatchMeal = (idx, userid, mealid, token)=>{
 return (dispatch)=> {
   $.ajax({
     url: "http://localhost:3012/api/watchedmeal",
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
         type: "completeUnwatchMeal",
         idx: idx
       })
     }
   })
   .catch((err)=>{
     let error = err.responseJSON && err.responseJSON.message || "there is an error"
     dispatch({
       type: "unwatchMealError",
       value: error
     })
   })
 }
}

export const watchMeal = (idx, userid, mealid, token)=>{
 return (dispatch)=> {
   $.ajax({
     url: "http://localhost:3012/api/watchedmeal",
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
         type: "completeWatchMeal",
         idx: idx
       })
     }
   })
   .catch((err)=>{
     let error = err.responseJSON && err.responseJSON.message || "there is an error"
     dispatch({
       type: "watchMealError",
       value: error
     })
   })
 }
}
