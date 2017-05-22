let initState = {
  data: null,
  error: null
};

const ApprovedMealReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getApprovedMealData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getApprovedMealDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "completePayment"){
    let data_copy = state.data.map(meal=>meal);
    data_copy[action.idx].is_paid = true;
    nextState = Object.assign({}, state, {
      data: data_copy
    })
  }else if(action.type === "paymentError"){
    nextState = Object.assign({}, state, {
      error: action.value 
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default ApprovedMealReducer;
