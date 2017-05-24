const initState = {
  signingUp: false,
  signedUp: false,
  usernameIsValid: false,
  passwordIsValid: false,
  phonenumberIsValid: false,
  emailIsValid: false,
  stateIsValid: false,
  error: null
}

const SignupReducer = (state = initState, action) => {
 let nextState;
 if(action.type==="usernameChange"){
   nextState = Object.assign({}, state, {
     username: action.value,
     usernameIsValid: action.validator
   })
 }else if(action.type==="usernameValidationError"){
   nextState = Object.assign({}, state, {
     error: action.value
   })
 }else if(action.type==="passwordChange"){
   nextState = Object.assign({}, state, {
     password: action.value,
     passwordIsValid: action.validator
   })
 }else if(action.type==="nameChange"){
   nextState = Object.assign({}, state, {
     name: action.value
   })
 }else if(action.type==="addressChange"){
   nextState = Object.assign({}, state, {
     address: action.value
   })
 }else if(action.type==="cityChange"){
   nextState = Object.assign({}, state, {
     city: action.value
   })
 }else if(action.type==="stateChange"){
   nextState = Object.assign({}, state, {
     state: action.value,
     stateIsValid: action.validator
   })
 }else if(action.type==="phonenumberChange"){
   nextState = Object.assign({}, state, {
     phonenumber: action.value,
     phonenumberIsValid: action.validator
   })
 }else if(action.type==="emailChange"){
   nextState = Object.assign({}, state, {
     email: action.value,
     emailIsValid: action.validator
   })
 }else if(action.type==="introtitleChange"){
   nextState = Object.assign({}, state, {
     introtitle: action.value
   })
 }else if(action.type==="introcontentChange"){
   nextState = Object.assign({}, state, {
     introcontent: action.value
   })
 }else if(action.type==="foodpreferenceChange"){
   nextState = Object.assign({}, state, {
     foodpreference: action.value
   })
 }else if(action.type==="foodrestrictionChange"){
   nextState = Object.assign({}, state, {
     foodrestriction: action.value
   })
 }else if(action.type==="profileimguploadComplete"){
   nextState = Object.assign({}, state, {
     img: action.value,
     error: null
   })
 }else if(action.type==="profileimguploadError"){
   nextState = Object.assign({}, state, {
     error: action.value
   })
 }else if(action.type==="startSigningUp"){
   nextState = Object.assign({}, state, {
     signingUp: true
   })
 }else if(action.type==="doneSigningUp"){
   nextState = Object.assign({}, state, {
     signingUp: false,
     signedUp: true,
   })
 }else{
   nextState = Object.assign({}, state)
 }
 return nextState;
}

export default SignupReducer;
