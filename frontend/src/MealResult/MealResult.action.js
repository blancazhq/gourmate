import $ from "jquery";
import BASEURL from "../baseurl";

export const getMealData = (searchterms)=> {
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/meals`,
      method: "get",
      data: searchterms
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
