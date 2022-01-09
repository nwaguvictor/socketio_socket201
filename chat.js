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
});

// Main Namespace
io.on('connection', socket => {
  socket.on('welcome', () => console.log(socket.id + ' joined'));
  socket.on('disconnecting', () => {
    console.log(socket.id + " is about to leave the group");
  })

  socket.on('message:sent', msg => {
    socket.broadcast.emit('message:received', { text: msg.text })
  })
});

// Admin namespace
const admin = io.of('/admin');

admin.on('connect', (socket) => {
  socket.emit('admin:message', 'welcome to admin channel');
});


server.listen(9000);