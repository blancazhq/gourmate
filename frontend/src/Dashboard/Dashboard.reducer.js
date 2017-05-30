let initState = {
  showMessageMenu:false,
  showMeallistMenu:false,
  showHostMenu:false,
};

const DashboardReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "toggleMessageMenu"){
    nextState = Object.assign({}, state, {
      showMessageMenu: !state.showMessageMenu
    })
  }else if(action.type === "toggleMeallistMenu"){
    nextState = Object.assign({}, state, {
      showMeallistMenu: !state.showMeallistMenu
    })
  }else if(action.type === "toggleHostMenu"){
    nextState = Object.assign({}, state, {
      showHostMenu: !state.showHostMenu
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}
export default DashboardReducer;
