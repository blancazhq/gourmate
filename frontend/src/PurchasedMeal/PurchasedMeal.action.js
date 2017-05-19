import $ from "jquery";
import BASEURL from "../baseurl";

export const getPurchasedMealData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/purchasedmeal`,
      method: "get",
      data: {
        id: id,
        token: token
      }
    })
    .then((data)=>{
      dispatch({
        type: "getPurchasedMealData",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getPurchasedMealDataError",
        value: error
      })
    })
  }
}
