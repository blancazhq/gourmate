let initState = {
  keyword: null,
  city: null,
  state: null,
  div1Entered: false,
  div2Entered: false,
  div3Entered: false
};

const SearchReducer = (state=initState, action)=>{
  let nextState;
  if(action.type==="searchKeywordChange"){
    nextState = Object.assign({}, state, {
      keyword: action.value
    })
  }else if(action.type==="searchKeywordChange"){
    nextState = Object.assign({}, state, {
      city: action.value
    })
  }else if(action.type==="searchstateChange"){
    nextState = Object.assign({}, state, {
      state: action.value
    })
  }else if(action.type==="completeGetFeaturedMeals"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type==="getFeaturedMealsError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type==="div1Enter"){
    nextState = Object.assign({}, state, {
    div1Entered: true
    })
  }else if(action.type==="div2Enter"){
    nextState = Object.assign({}, state, {
    div2Entered: true
    })
  }else if(action.type==="div3Enter"){
    nextState = Object.assign({}, state, {
    div3Entered: true
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default SearchReducer;
