const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));

  socket.on('createMessage', (msg, callback) => {
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    callback('this is from the server');
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected!');
  })
});


app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`running on port ${port}`);
});