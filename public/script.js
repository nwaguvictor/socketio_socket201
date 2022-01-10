const socket = io('http://localhost:9000');
const adminSocket = io('http://localhost:9000/admin');

socket.on('connect', () => {
  socket.emit('welcome');
})

adminSocket.on('connect', () => {
  adminSocket.on('admin:message', (msg) => {
    console.log(msg)
  });
});

socket.on('message:received', (msg) => {
  displayMessage(msg.text, 'received')
})

socket.on('room:joined', (msg) => displayMessage(msg, 'notification'));

// DOM Query function
const $ = n => document.querySelector(n);

$('#message-form').addEventListener('submit', e => {
  e.preventDefault();
  const newMessage = $('#message-input').value;
  displayMessage(newMessage, 'sent');

  socket.emit('message:sent', {
    text: newMessage
  });

  $('#message-input').value = "";
})

$('#room-btn').addEventListener('click', e => {
  e.preventDefault();
  const name = $('#message-input').value;
  socket.emit('room:join', { name });
  $('#message-input').value = "";
});

function displayMessage(message, type) {
  if (!message) return;
  const li = document.createElement('li');

  switch (type) {
    case 'sent':
      li.classList.add('sent');
      break;
    case 'received':
      li.classList.add('received');
      break;
    case 'notification':
      li.classList.add('notification');
      break;
    default:
      return;
  }

  li.innerText = message;
  $('#messages').appendChild(li);
}