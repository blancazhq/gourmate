import $ from "jquery";

export const getHostedMealData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: "http://localhost:3012/api/hostedmeal",
      method: "get",
      data: {
        id: id,
        token: token
      }
    })
    .then((data)=>{
      dispatch({
        type: "getHostedMealData",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getHostedMealDataError",
        value: error
      })
    })
  }
}
