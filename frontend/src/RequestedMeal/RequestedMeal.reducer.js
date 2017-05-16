let initState = {
  data: null,
  error: null
};

const RequestedMealReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getRequestedMealData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getRequestedMealDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default RequestedMealReducer;
