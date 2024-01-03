const socket = io('http://localhost:8000');

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

const name = prompt( "Enter your name to join");
socket.emit('new-user-joined', naam);

Socket.on('user-joined', naam =>{
  append('${naam} joined the Chat', 'right')
})

Socket.on('receive', data =>{
  append('${data.naam}: ${data.message}', 'left')
})

Socket.on('left', name =>{
  append('${data.naam} left the chat', 'left')
})