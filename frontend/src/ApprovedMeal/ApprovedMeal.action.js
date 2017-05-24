import $ from "jquery";
import BASEURL from "../baseurl";

export const getApprovedMealData = (id, token)=> {
  return (dispatch)=>{
    $.ajax({
      url: `${BASEURL}/api/approvedmeal`,
      method: "get",
      data: {
        id: id,
        token: token
      }
    })
    .then((data)=>{
      data.forEach((meal)=>{
        meal.is_paid = false
      })
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

export const checkout = (idx, mealid, title, price, quantity, userid, auth_token) => {
  return (dispatch) => {
    var handler = window.StripeCheckout.configure({
  // publishable key
  key: 'pk_test_SDg9wHrn1SuhFKYeMsxrzcb2',
  locale: 'auto',
  token: function callback(token) {
      var stripeToken = token.id;
      // Make checkout API call here and send the stripe token
      // to the back end
      $.ajax({
        url: `${BASEURL}/api/payment`,
        method: "post",
        data: JSON.stringify({
          stripetoken: stripeToken,
          description: title,
          userid: userid,
          mealid: mealid,
          quantity: quantity,
          token: auth_token
        }),
        contentType: "application/json"
      })
      .then((data)=>{
        if(data.id === mealid){
          dispatch({
            type: "completePayment",
            idx: idx
          })
        }
      })
      .catch((err)=>{
        let error = err.responseJSON && err.responseJSON.message || "there is an error"
        dispatch({
          type: "paymentError",
          value: error
        })
      })
    }
  });
// this actually opens the popup modal dialog
    handler.open({
      name: 'Gourmate',
      description: title,
      amount: price * 100 * quantity
    });
  }
}
