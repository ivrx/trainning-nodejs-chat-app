var socket = io();

socket.on('connect', function () {
  console.log('connected!');

});

socket.on('disconnect', function () {
  console.log('disconnected!');
});

socket.on('newMessage', function (msg) {
  console.log(msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('input[name=message]').val()
  }, function () {

  });
});