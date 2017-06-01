import socket from "../socket"

export const toggleNav = ()=>({
  type: "toggleNav"
})

export const chatinputChange = (event)=>({
  type: "chatinputChange",
  value: event.target.value
})

export const chattoChange = (event)=>({
  type: "chattoChange",
  value: event.target.value
})

export const socketJoin = (name)=>{
  return (dispatch) =>{
    socket.emit("join", name)
  }
}

export const receiveJoin = (array, name)=>({
  type: "receiveJoin",
  currentuser: name,
  name: array[0],
  people: array[1]
})

export const receiveLeave = (array)=>({
  type: "receiveLeave",
  name: array[0],
  people: array[1]
})

export const receiveChat = (msg)=>({
  type: "receiveChat",
  value: msg
})

export const socketSend = (message, to)=>{
  return (dispatch) =>{
    socket.emit("chat message", [message, to])
    dispatch({
      type:"socketSend"
    })
  }
}

export const clearChat = ()=>({
  type: "clearChat"
})

export const toggleChat = ()=>({
  type: "toggleChat"
})

export const handleResize =()=>({
  type: "handleResize"
})
