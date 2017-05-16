import $ from "jquery";

export const getPurchasedMealData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: "http://localhost:3012/api/purchasedmeal",
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
