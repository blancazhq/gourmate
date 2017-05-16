import $ from "jquery";

export const getManageRequestData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: "http://localhost:3012/api/managerequest",
      method: "get",
      data: {
        id: id,
        token: token
      }
    })
    .then((data)=>{
      data.forEach((message)=>{
        message.approved = "not approved";
      })
      dispatch({
        type: "getManageRequestData",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getManageRequestDataError",
        value: error
      })
    })
  }
}

export const acceptRequest = (idx, mealid, userid, token)=>{
  return (dispatch)=> {
    console.log(idx, mealid, userid, token)
    $.ajax({
      url: "http://localhost:3012/api/acceptrequest",
      method: "post",
      data: JSON.stringify({
        mealid: mealid,
        userid: userid,
        token: token
      }),
      contentType: "application/json"
    })
    .then((data)=>{
      if(data.user_id === userid){
        dispatch({
          type: "acceptRequestComplete",
          idx:idx
        })
      }
    })
    .catch((err)=>{
      console.log(err)
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "acceptRequestError",
        value: error
      })
    })
  }
}

export const declineRequest = (idx, mealid, userid, token)=>{
  return (dispatch)=> {
    $.ajax({
      url: "http://localhost:3012/api/declinerequest",
      method: "post",
      data: JSON.stringify({
        mealid: mealid,
        userid: userid,
        token: token
      }),
      contentType: "application/json"
    })
    .then((data)=>{
      if(data.user_id === userid){
        dispatch({
          type: "declineRequestComplete",
          idx:idx
        })
      }
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "declineRequestError",
        value: error
      })
    })
  }
}
