let initState = {
  keyword: null,
  city: null,
  state: null
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
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default SearchReducer;
