const socket = io('http://localhost:8000');

const from = document.getElementById('send-container');
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
socket.emit('new-user-joined', name);

Socket.on('user-joined', name =>{
  append('${name} joined the Chat', 'right')
})

Socket.on('receive', data =>{
  append('${data.name}: ${data.message}', 'left')
})

Socket.on('left', name =>{
  append('${data.name} left the chat', 'left')
})