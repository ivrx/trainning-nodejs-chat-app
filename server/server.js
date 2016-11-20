const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.emit('newMessage', {
    from: 'admin',
    text: 'welcome to chat app!',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'new user joined',
    createdAt: new Date().getTime()
  });

  // socket.emit from admin, text: welcome to chat app
  // socket.broadcast.emit from admin, text: new user joined

  socket.on('createMessage', (msg) => {
    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // });

  });

  socket.on('disconnect', () => {
    console.log('User was disconnected!');
  })
});


app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`running on port ${port}`);
});