const initState = {
  signedIn: false,
  username: null,
  password: null,
  message: null,
  error: null,
  token: null,
  ishost: null
}

const SigninReducer = (state = initState, action) => {
 let nextState;
 if(action.type==="signinUsernameChange"){
   nextState = Object.assign({}, state, {
     username: action.value
   })
 }else if(action.type==="signinPasswordChange"){
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
     message: "welcome " + action.value.name + "!",
     signedIn: true,
     token: action.value.token,
     id: action.value.id,
     ishost: action.value.is_host,
     name: action.value.name
   })
 }else if(action.type==="signOut"){
   nextState = Object.assign({}, state, {
     id: null,
     signedIn: false,
     username: null,
     password: null,
     message: null,
     error: null,
     token: null
   })
 }else{
   nextState = state;
 }
 return nextState;
}

export default SigninReducer;
