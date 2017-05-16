export function searchKeywordChange(event){
  return {
    type: "searchKeywordChange",
    value: event.target.value
  }
}

export function searchcityChange(event){
  return {
    type: "searchcityChange",
    value: event.target.value
  }
}

export function searchstateChange(event){
  return {
    type: "searchstateChange",
    value: event.target.value
  }
}
