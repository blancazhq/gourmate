import $ from "jquery";
import BASEURL from "../baseurl";

export const getSingleUserData = (id)=> {
  return (dispatch)=>{
    $.ajax({
      url: BASEURL+"/api/users/"+id,
      method: "get"
    })
    .then((data)=>{
      dispatch({
        type: "getSingleUserData",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getUserDataError",
        value: error
      })
    })
  }
}
