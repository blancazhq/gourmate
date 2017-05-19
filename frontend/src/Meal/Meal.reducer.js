let initState = {
  data: null,
  error: null,
  peopleWantToJoin: 0,
  quantity: 1,
  reviewing: false,
  reviewed: false,
  reviewTitle: null,
  reviewContent: null,
  reviewImgs: null,
  reviewStar: 5
};

const MealReducer = (state=initState, action)=>{
  let nextState;
  if(action.type === "getSingleMealData"){
    nextState = Object.assign({}, state, {
      data: action.value
    })
  }else if(action.type === "getSingleMealDataError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "getMealStatus"){
    nextState = Object.assign({}, state, {
      status: action.value
    })
  }else if(action.type === "getMealStatusError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "completeWatchSingleMeal"){
    nextState = Object.assign({}, state, {
      status: "watched"
    })
  }else if(action.type === "watchSingleMealError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "completeUnwatchSingleMeal"){
    nextState = Object.assign({}, state, {
      status: "not watched"
    })
  }else if(action.type === "unwatchSingleMealError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "quantityChange"){
    nextState = Object.assign({}, state, {
      quantity: action.value
    })
  }else if(action.type === "completeRequestMeal"){
    nextState = Object.assign({}, state, {
      peopleWantToJoin: action.value.quantity
    })
  }else if(action.type === "requestMealError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "toggleReview"){
    nextState = Object.assign({}, state, {
      reviewing: !state.reviewing
    })
  }else if(action.type === "reviewTitleChange"){
    nextState = Object.assign({}, state, {
      reviewTitle: action.value
    })
  }else if(action.type === "reviewContentChange"){
    nextState = Object.assign({}, state, {
      reviewContent: action.value
    })
  }else if(action.type === "reviewStarChange"){
    let newStar = state.reviewStar+1;
    if(state.reviewStar === 5){
      newStar = 1;
    }
    nextState = Object.assign({}, state, {
      reviewStar: newStar
    })
  }else if(action.type === "uploadReviewPictureComplete"){
    nextState = Object.assign({}, state, {
      reviewImgs: action.value
    })
  }else if(action.type === "uploadReviewPictureError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else if(action.type === "completeAddReview"){
    nextState = Object.assign({}, state, {
      reviewing: false,
      reviewed: true
    })
  }else if(action.type === "addReviewError"){
    nextState = Object.assign({}, state, {
      error: action.value
    })
  }else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}

export default MealReducer;
