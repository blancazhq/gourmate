const initState = {
  createdmeal: false,
  error: null,
  keyword: ["",""],
  course: [{
    name: "",
    description: "",
    type: ""
  }]
}

const CreateMealReducer = (state = initState, action) => {
 let nextState;
 if(action.type==="introtitleChange"){
   nextState = Object.assign({}, state, {
     introtitle: action.value
   })
 }else if(action.type==="introcontentChange"){
   nextState = Object.assign({}, state, {
     introcontent: action.value
   })
 }else if(action.type==="mealdateChange"){
   nextState = Object.assign({}, state, {
     mealdate: action.value
   })
 }else if(action.type==="mealtimeChange"){
   nextState = Object.assign({}, state, {
     mealtime: action.value
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
     state: action.value
   })
 }else if(action.type==="priceChange"){
   nextState = Object.assign({}, state, {
     price: action.value
   })
 }else if(action.type==="peoplelimitChange"){
   nextState = Object.assign({}, state, {
     peoplelimit: action.value
   })
 }else if(action.type==="keywordChange"){
   let keyword_copy = state.keyword.map(keyword=>keyword)
   keyword_copy[action.idx] = action.value
   nextState = Object.assign({}, state, {
     keyword: keyword_copy
   })
 }else if(action.type==="addKeyword"){
   let keyword_copy = state.keyword.map(keyword=>keyword)
  keyword_copy.push("");
   nextState = Object.assign({}, state, {
     keyword: keyword_copy
   })
 }else if(action.type==="coursenameChange"){
   let course_copy = state.course.map(course=>course)
   course_copy[action.idx].name = action.value
   nextState = Object.assign({}, state, {
     course: course_copy
   })
 }else if(action.type==="coursedescriptionChange"){
   let course_copy = state.course.map(course=>course)
   course_copy[action.idx].description = action.value
   nextState = Object.assign({}, state, {
     course: course_copy
   })
 }else if(action.type==="coursetypeChange"){
   let course_copy = state.course.map(course=>course)
   course_copy[action.idx].type = action.value
   nextState = Object.assign({}, state, {
     course: course_copy
   })
 }else if(action.type==="addCourse"){
   let course_copy = state.course.map(course=>course)
   course_copy.push({
     name: "",
     description: "",
     type: ""
   })
   nextState = Object.assign({}, state, {
     course: course_copy
   })
 }else if(action.type==="mealimguploadComplete"){
   nextState = Object.assign({}, state, {
     img: action.value,
     error: null
   })
 }else if(action.type==="mealimguploadError"){
   nextState = Object.assign({}, state, {
     error: action.value
   })
 }else if(action.type==="doneCreatingMeal"){
   nextState = Object.assign({}, state, {
     createdmeal: true
   })
 }else{
   nextState = Object.assign({}, state)
 }
 return nextState;
}

export default CreateMealReducer;
