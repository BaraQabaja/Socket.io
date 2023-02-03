const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app); 

const io = require("socket.io")(server); 
io.on("connection", (socket) => {

  console.log("new user connected");

  socket.on("clientEvent", (data) => {
    let { message, name } = data;
    // console.log(message, name);
    // console.log('\a');
    io.emit("sendMessageToAll",{message,name})
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  // res.sendFile('C:/Users/actc/OneDrive/Desktop/socketio/chat.html');
  res.sendFile(path.join(__dirname, "/chat.html"));
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

