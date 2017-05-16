import $ from "jquery";

export const getApprovedMealData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: "http://localhost:3012/api/approvedmeal",
      method: "get",
      data: {
        id: id,
        token: token
      }
    })
    .then((data)=>{
      dispatch({
        type: "getApprovedMealData",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getApprovedMealDataError",
        value: error
      })
    })
  }
}
