let initState = {
  data: null,
  error: null
};

const HostedMealReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getHostedMealData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getHostedMealDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default HostedMealReducer;
