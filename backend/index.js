const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io")
const io = new Server(server);

// TODO
// [x] Broadcast a message to connected users when someone connects or disconnects.
// [x] Add support for nicknames.
// [x] Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
// [] Add “{user} is typing” functionality.
let typingUsers = [];
// [] Show who’s online.
let connections = [];
// [] Add private messaging.

//just some html response
app.get('/', (req, res) => {
  res.send('<h1>nothing to see here</h1>');
});

//establish server listening port
server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});

// handle sockets
io.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  console.log("user connected: " + username);
  //send message to all clients except the connecting one about user joining chat
  socket.broadcast.emit("user connected", username);

  //potential refactor - save username from hand shake to prevent spoofing
  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", username, msg);
  })

  socket.on("disconnect", () => {
    console.log("user disconnected: " + username);
    //same as for connection, this time for getting disconnected
    typingUsers = typingUsers.filter(v => v !== username)
    socket.broadcast.emit("user disconnected", username);
  })

  socket.on("user typing", () => {
    typingUsers.push(username)
    announceTyping(socket)
  })

  socket.on("user not typing", () => {
    typingUsers = typingUsers.filter(v => v !== username)
    announceTyping(socket)
  })
})

function announceTyping(socket) {
  socket.emit("users typing", typingUsers)
}

// might not work :)