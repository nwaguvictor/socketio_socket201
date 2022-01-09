const express = require('express');
const {createServer} = require('http')
const { Server } = require('socket.io');

const app = express()

app.use(express.static(__dirname + '/public'));

const server = createServer(app)

// Socket.io server
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  socket.on('welcome', () => console.log(socket.id + ' joined'));
  socket.on('disconnecting', () => {
    console.log(socket.id + " is about to leave the group");
  })

  socket.on('message:sent', msg => {
    socket.broadcast.emit('message:received', {text: msg.text})
  })
})


server.listen(9000);