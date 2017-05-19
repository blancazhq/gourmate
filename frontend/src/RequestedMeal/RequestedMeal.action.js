import $ from "jquery";
import BASEURL from "../baseurl";

export const getRequestedMealData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/requestedmeal`,
      method: "get",
      data: {
        id: id,
        token: token
      }
    })
    .then((data)=>{
      dispatch({
        type: "getRequestedMealData",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getRequestedMealDataError",
        value: error
      })
    })
  }
}
