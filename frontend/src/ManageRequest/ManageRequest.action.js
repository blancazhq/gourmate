import $ from "jquery";
import BASEURL from "../baseurl";

export const getManageRequestData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/managerequest`,
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

export const acceptRequest = (idx, mealid, userid, hostid, hostname, mealtitle, token)=>{
  return (dispatch)=> {
    $.ajax({
      url: `${BASEURL}/api/acceptrequest`,
      method: "post",
      data: JSON.stringify({
        mealid: mealid,
        userid: userid,
        token: token,
        hostid: hostid,
        hostname: hostname,
        mealtitle: mealtitle
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
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "acceptRequestError",
        value: error
      })
    })
  }
}

export const declineRequest = (idx, mealid, userid, hostid, hostname, mealtitle, token)=>{
  return (dispatch)=> {
    $.ajax({
      url: `${BASEURL}/api/declinerequest`,
      method: "post",
      data: JSON.stringify({
        mealid: mealid,
        userid: userid,
        token: token,
        hostid: hostid,
        hostname: hostname,
        mealtitle: mealtitle
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
