const socket = io('http://localhost:8000');

const from = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

const append = (message, postion) =>{
  const messageElement = document.createElement('div');
  messageElement.innerHTML = message;
  messageElement.classList.add('message')
  messageElement.classList.add('position');
  messageContainet.append('messageElement');
}

const name = prompt( "Enter your name to join");
socket.emit('new-user-joined', name);

Socket.on('user-joined', data =>{
  append('${name} joined the Chat', 'right')
})