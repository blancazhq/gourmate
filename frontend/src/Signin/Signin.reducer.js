const initState = {
  signedIn: false,
  username: null,
  password: null,
  message: null,
  error: null,
  token: null
}

const SigninReducer = (state = initState, action) => {
 let nextState;
 if(action.type==="usernameChange"){
   nextState = Object.assign({}, state, {
     username: action.value
   })
 }else if(action.type==="passwordChange"){
   nextState = Object.assign({}, state, {
     password: action.value
   })
 }else if(action.type==="wrongPassword"){
   nextState = Object.assign({}, state, {
     message: "wrong password"
   })
 }else if(action.type==="wrongUsername"){
   nextState = Object.assign({}, state, {
     message: "username doesn't exist"
   })
 }else if(action.type==="doneSigningIn"){
   nextState = Object.assign({}, state, {
     message: "welcome " + state.username + "!",
     signedIn: true,
     token: action.value.token,
     id: action.value.id
   })
 }else{
   nextState = Object.assign({}, state)
 }
 return nextState;
}

export default SigninReducer;
