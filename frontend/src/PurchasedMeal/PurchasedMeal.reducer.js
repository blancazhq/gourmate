let initState = {
  data: null,
  error: null
};

const PurchasedMealReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getPurchasedMealData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getPurchasedMealDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default PurchasedMealReducer;
