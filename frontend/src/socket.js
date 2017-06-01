let io = require("socket.io-client");
let socket = io("http://localhost:3012");
if(window.location.hostname !== "localhost"){
  socket = io();
}


export default socket;
