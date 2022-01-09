const express = require('express');
const http = require('http')
const { Server } = require('socket.io');

const app = express()

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app)

// Socket.io server
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  socket.on('welcome', () => console.log(socket.id + ' joined'));

  socket.on('message:sent', msg => {
    socket.broadcast.emit('message:received', {text: msg.text})
  })
})

server.listen(9000);