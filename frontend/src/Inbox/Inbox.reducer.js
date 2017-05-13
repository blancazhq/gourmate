let initState = {
  data: null,
  error: null
};

const InboxReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getInboxData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getInboxDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "toggleContent"){
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

export default InboxReducer;
