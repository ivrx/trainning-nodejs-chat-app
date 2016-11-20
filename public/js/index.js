var socket = io();

socket.on('connect', function () {
  console.log('connected!');

  socket.emit('createMessage', {
    from: 'zubri',
    text: 'lol text'
  });

});

socket.on('disconnect', function () {
  console.log('disconnected!');
});

socket.on('newMessage', function (msg) {
  console.log(msg);
});