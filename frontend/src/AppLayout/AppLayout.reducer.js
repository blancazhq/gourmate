let initState = {
  showNav: false,
  width: window.innerWidth
};

const AppLayoutReducer = (state=initState, action)=>{
  let nextState;
  if(action.type==="toggleNav"){
    nextState = Object.assign({}, state, {
      showNav: !state.showNav
    })
  }else{
    nextState = state;
  }
  return nextState;
}

export default AppLayoutReducer;
