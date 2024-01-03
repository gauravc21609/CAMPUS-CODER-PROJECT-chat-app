//Node sever which will handle socket.io connections.
// const express = require ('express')
// const app = express()
const http = require('http').createServer()

const io = require('socket.io')(8000)
const PORT = 4900

http.listen(PORT,() =>{
   console.log(`Listening on port ${PORT}` )
})

const users = {};

  // if any new user join the chat, let other users connected to server know.
io.on('connection', socket =>{
    socket.on('new-user-joined', naam =>{
      console.log('new-user-joined', naam);
      users[socket.id] = naam;
      socket.broadcast.emit('user-joined', naam);
    });

    // if someone sends a message, broadcast it to other people.
    socket.on('send', message =>{
       socket.broadcast.emit('recieve', {message : message, naam: users[socket.id]})
    });

    // of someone leaves the chat, let other know.
    socket.on('disconnect', message =>{
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
    });
});

