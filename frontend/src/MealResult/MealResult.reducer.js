let initState = {
  data: null
};

const MealResultReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getMealData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default MealResultReducer;
