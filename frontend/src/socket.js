let io = require("socket.io-client");
let socket;
if(window.location.hostname !== "localhost"){
  socket = io();
} else {
  socket = io("http://localhost:3012");
}

export default socket;
