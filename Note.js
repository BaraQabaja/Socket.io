const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app); //here i created a server with http protocol and express.js

const io = require("socket.io")(server); //! here i mean that require socket.io function and send my server function as a parameter to socket.io and the result stored in io variable or i can do it like this :
//? const socketIO=require('socket.io');
//? const IO=socketIO(server);
//by doing the last steps i established socketIO on the server side

//web socket in general depents on events ,server emits(يرسل) events--->client listen to these events also the client emit events--->server listen to these events.

//! so we have to establish event listener on both client and server side and also we have to establish event emitter on both sides to emit events .

//first i want to establish event listener on the server side , i have two events to listen, 'connnect' i use it on the client side to listen to the events ,and i have 'connection' which i use it on the server to listen to the coming events.

//! NOTE:
//i said that web socket in general the server listen to the events coming from the *specific client has sent* so! how to reach to that specific client that emitting these events!!!🤔 , sooo to know who is the client that doing these event i can reach him after he do the connection so i have to 'listen' on the event of 'connetion' to reach the *specific client*

// i will use on() method to enable me to listen to events.
io.on("connection", (socket) => {
  //here i called as 'socket',the name of my client is 'socket', i can change the name 'socket' to any word i want.
  //! Note:
  //? 1-socket.emit ==>  do emit the event from specific client
  //? 2-io.emit ==>  do emit the event in global over all clients
  //? 3-socket.broadcast.emit ==>  do emit the event in global over all clients except the current client(current socket)
  console.log("new user connected");
  //socket.on i use it to listen to the events coming from my *specific client* which i called it 'socket' but io.on() i use it to listen to the server events in general
  //!the word 'clientEvent' i used in bellow line it is the name i used in client side to send events so in client side i should do like this  socket.emit("clientEvent", data); so i emited event with the name of "clientEvent" and i sent a data with this event name and in server side i should receve this data using socket.on('theNameIUsedInClientSide',theDataSent);
  socket.on("clientEvent", (data) => {
    let { message, name } = data;
    console.log(message, name);
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

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });
