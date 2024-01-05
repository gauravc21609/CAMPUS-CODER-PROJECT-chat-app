//client.js
const io = require('socket.io');
const socket = io('http://localhost:8000', {reconnect: true});

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ding-idea.mp3');



const append = (message, postion) =>{
  const messageElement = document.createElement('div');
  messageElement.innerHTML = message;
  messageElement.classList.add('message');
  messageElement.classList.add('position');
  messageContainer.append('messageElement');
  if(position == 'left'){
    audio.play();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append('you: ${message}', 'right');
  socket.emit('send', message);
  messageInput.value = ''
})

const naam = prompt( "Enter your name to join");
socket.emit('new-user-joined', naam);

socket.on('user-joined', naam =>{
  append('${naam} joined the Chat', 'right')
})

socket.on('receive', data =>{
  append('${data.naam}: ${data.message}', 'left')
})

socket.on('left', name =>{
  append('${data.naam} left the chat', 'left')
})