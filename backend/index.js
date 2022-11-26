const { randomInt } = require("crypto")
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)

// TODO
// [x] Broadcast a message to connected users when someone connects or disconnects.
// [x] Add support for nicknames.
// [x] Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
// [x] Add “{user} is typing” functionality.
// [x] Show who’s online.
// [] Add private messaging.

//just some html response
app.get('/', (req, res) => {
  res.send('<h1>nothing to see here</h1>')
});

//establish server listening port
server.listen(3000, () => {
  console.log('listening on http://localhost:3000')
});

// server storage for shared data: 
let dmUsers = ['all']
let typingUsers = []

// handle sockets
io.on('connection', (socket) => {
  // TODO work on this to disallow multiple users with the same username
  const username = socket.handshake.query.username

  console.log("user connected: " + username)

  // save username into dmUsers storage
  dmUsers.push(username)
  io.sockets.emit("user list update", dmUsers)

  // notify users about user getting connected to the server
  socket.broadcast.emit("user connected", username)
  socket.broadcast.emit("users typing", typingUsers)

  // called when user sends a chat message
  socket.on("chat message", (msg) => {
    console.log(username + " sent: " + msg)

    socket.broadcast.emit("chat message", username, msg)
  })

  // called when user sends a private chat message
  socket.on("private chat message", (msg, to) => {
    console.log(username + " sent privately: " + msg + " to: " + to)

    socket.broadcast.emit("private chat message", username, msg, to)
  })

  // called when user starts typing
  socket.on("user typing", () => {
    typingUsers.push(username)

    // output to the console which user is typing
    console.log(username + " is typing")
    // console.log(typingUsers)  <- if needed for debugging purposes, decomment

    // update user on users that are typing
    socket.broadcast.emit("users typing", typingUsers)
  })

  // called when user stops typing
  socket.on("user not typing", () => {
    typingUsers = typingUsers.filter(v => v !== username)

    // output to the console that user is not typing
    console.log(username + " is not typing")
    // console.log(typingUsers) <- if needed for debugging purposes, decomment

    // update user on users that are typing
    socket.broadcast.emit("users typing", typingUsers)
  })

  // called on user disconnecting
  socket.on("disconnect", () => {
    // announce user disconnecting in server command line output
    console.log("user disconnected: " + username);

    // remove user from typinUsers storage
    typingUsers = typingUsers.filter(v => v !== username)
    socket.broadcast.emit("users typing")

    // remove user from dmUsers storage
    dmUsers = dmUsers.filter(v => v !== username)
    socket.broadcast.emit("user list update", dmUsers)

    // notify users about user getting disconnected from the server
    socket.broadcast.emit("user disconnected", username)
  })
})