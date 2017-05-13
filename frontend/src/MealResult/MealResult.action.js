import $ from "jquery";

export const getMealData = ()=> {
  return (dispatch)=>{
    $.ajax({
      url: "http://localhost:3012/api/meals",
      method: "get"
    })
    .then((data)=>{
      dispatch({
        type: "getMealData",
        value: data
      })
    })
    .catch((err)=>{
      let error = err.responseJSON && err.responseJSON.message || "there is an error"
      dispatch({
        type: "getMealDataError",
        value: error
      })
    })
  }
}
