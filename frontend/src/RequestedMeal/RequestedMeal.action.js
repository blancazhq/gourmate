import $ from "jquery";

export const getRequestedMealData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: "http://localhost:3012/api/requestedmeal",
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
