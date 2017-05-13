let initState = {
  data: null
};

const SentReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getSentData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getSentDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "toggleSentContent"){
    let data_copy = state.data.map((message)=>message)
    data_copy[action.idx].show_content = !data_copy[action.idx].show_content
    nextState = Object.assign({}, state, {
      data: data_copy
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default SentReducer;
