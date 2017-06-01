let initState = {
  data: null,
  error: null,
  replyid: null,
  replyname: null,
  hasUnreadMessage:false
};

const InboxReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getInboxData"){
    nextState = Object.assign({}, state, {
      data: action.value,
      hasUnreadMessage: action.hasUnreadMessage
    })
  }else if(action.type === "getInboxDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "toggleContent"){
    let data_copy = state.data.map((message)=>message)
    data_copy[action.idx].show_content = !data_copy[action.idx].show_content;
    data_copy[action.idx].is_read = true;
    let hasUnreadMessage_copy = data_copy.some((message)=> !message.is_read)
    nextState = Object.assign({}, state, {
      data: data_copy,
      hasUnreadMessage: hasUnreadMessage_copy
    })
  }else if(action.type === "reply"){
    nextState = Object.assign({}, state, {
      replyid: action.id,
      replyname: action.name
    })
  }else if(action.type === "clearReply"){
    nextState = Object.assign({}, state, {
      replyid: null,
      replyname: null
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default InboxReducer;
