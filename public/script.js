const socket = io('http://localhost:9000');

socket.on('connect', () => {
  socket.emit('welcome');
})

socket.on('message:received', (msg) => {
  displayMessage(msg.text, 'received')
})

const form = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input')

form.addEventListener('submit', e => {
  e.preventDefault();
  const newMessage = messageInput.value;
  displayMessage(newMessage, 'sent');

  socket.emit('message:sent', {
    text: newMessage
  });
  messageInput.value = "";
})

function displayMessage(message, type) {
  if (!message) return;
  const li = document.createElement('li');

  if (type === 'sent') {
    li.classList.add('sent')
  } else {
    li.classList.add('received')
  }

  li.innerText = message;
  document.querySelector('#messages').appendChild(li);
}