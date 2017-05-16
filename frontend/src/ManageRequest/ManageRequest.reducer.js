let initState = {
  data: null,
  error: null
};

const ManageRequestReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getManageRequestData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getManageRequestDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "acceptRequestComplete"){
    let data_copy = state.data.map((request)=>request);
    data_copy[action.idx].approved = "approved";
    nextState = Object.assign({}, state, {
      data: data_copy
    })
  }else if(action.type === "acceptRequestError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "declineRequestComplete"){
    let data_copy = state.data.map((request)=>request);
    data_copy[action.idx].approved = "declined";
    nextState = Object.assign({}, state, {
      data: data_copy
    })
  }else if(action.type === "declineRequestError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default ManageRequestReducer;
