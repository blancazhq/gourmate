let initState = {
  receivernametemp: null,
  namecandidates: null,
  receiverid: null,
  messagetitle: null,
  messagecontent: null,
  messagesent: 0
};

const NewMessageReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "addToNameTemp"){
    nextState = Object.assign({}, state, {
      receivernametemp: action.value
    })
  }else if(action.type === "getNames"){
    nextState = Object.assign({}, state, {
      namecandidates: action.value
    })
  }else if(action.type === "getNamesError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "selectCandidate"){
    nextState = Object.assign({}, state, {
      receiverid: action.id,
      receivernametemp: action.name
    })
  }else if(action.type === "messageTitleChange"){
    nextState = Object.assign({}, state, {
      messagetitle: action.value,
    })
  }else if(action.type === "messageContentChange"){
    nextState = Object.assign({}, state, {
      messagecontent: action.value,
    })
  }else if(action.type === "doneSendingMessage"){
    nextState = Object.assign({}, state, {
      messagesent: state.messagesent+1
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default NewMessageReducer;
