const initState = {
  ishost: null,
  message: null,
  error: null
}

const BecomeAHostReducer = (state = initState, action) => {
 let nextState;
 if(action.type==="completeBecomeAHost"){
   nextState = Object.assign({}, state, {
     message: "Thank you for becoming a host!",
     ishost: true
   })
 }else if(action.type==="becomeAHostError"){
   nextState = Object.assign({}, state, {
     error: action.value
   })
 }else{
   nextState = Object.assign({}, state)
 }
 return nextState;
}

export default BecomeAHostReducer;
