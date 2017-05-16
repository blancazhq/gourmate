let initState = {
  data: null,
  error: null,
  quantity: null
};

const WatchedMealReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getWatchedMealData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getWatchedMealDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "completeUnwatchMeal" || action.type === "completeWatchMeal"){
    let data_copy = state.data.map((data)=>data);
    data_copy[action.idx].watched = !data_copy[action.idx].watched;
    nextState = Object.assign({}, state, {
      data: data_copy
    })
  }else if(action.type === "watchMealError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "unwatchMealError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "watchedMealQuantityChange"){
    console.log(action.value)
    nextState = Object.assign({}, state, {
      quantity: action.value
    })
  }else if(action.type === "completeRequestWatchedMeal"){
    let data_copy = state.data.map((data)=>data);
    data_copy[action.idx].requested = true;
    nextState = Object.assign({}, state, {
      data: data_copy
    })
  }else if(action.type === "requestWatchedMealError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default WatchedMealReducer;
