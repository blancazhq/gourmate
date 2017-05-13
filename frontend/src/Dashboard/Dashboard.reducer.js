let initState = {
  data: null,
  error: null
};

const DashboardReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getSingleUserData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getSingleUserDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}
export default DashboardReducer;
