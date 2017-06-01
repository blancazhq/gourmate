let initState = {
  showNav: false,
  width: window.innerWidth,
  chatinput: null,
  chatto: "all",
  chatmessage: [],
  people: null,
  showChat: false
};

const AppLayoutReducer = (state=initState, action)=>{
  let nextState;
  if(action.type==="toggleNav"){
    nextState = Object.assign({}, state, {
      showNav: !state.showNav
    })
  }else if(action.type==="chatinputChange"){
    nextState = Object.assign({}, state, {
      chatinput: action.value
    })
  }else if(action.type==="chattoChange"){
    nextState = Object.assign({}, state, {
      chatto: action.value
    })
  }else if(action.type==="receiveChat"){
    let chatmessage_copy = state.chatmessage.map(message=>message)
    chatmessage_copy.push(action.value)
    nextState = Object.assign({}, state, {
      chatmessage: chatmessage_copy
    })
  }else if(action.type==="receiveJoin"){
    let chatmessage_copy = state.chatmessage.map(message=>message)
    chatmessage_copy.push(action.name+" has joined")
    for(var i=0;i<action.people.length;i++){
      if(action.people[i].name===action.currentuser){
        action.people.splice(i, 1);
      }
    }
    nextState = Object.assign({}, state, {
      chatmessage: chatmessage_copy,
      people: action.people
    })
  }else if(action.type==="receiveLeave"){
    let chatmessage_copy = state.chatmessage.map(message=>message)
    chatmessage_copy.push(action.name+" has left")
    nextState = Object.assign({}, state, {
      chatmessage: chatmessage_copy,
      people: action.people
    })
  }else if(action.type==="socketSend"){
    nextState = Object.assign({}, state, {
      chatinput: null
    })
  }else if(action.type==="clearChat"){
    nextState = Object.assign({}, state, {
      chatmessage: [],
      people: null
    })
  }else if(action.type==="toggleChat"){
    nextState = Object.assign({}, state, {
      showChat: !state.showChat
    })
  }else if(action.type==="handleResize"){
    nextState = Object.assign({}, state, {
      width: window.innerWidth
    })
  }else{
    nextState = state;
  }
  return nextState;
}

export default AppLayoutReducer;
