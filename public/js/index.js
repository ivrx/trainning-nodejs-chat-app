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

socket.on('newLocationMessage', function (msg) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${msg.from}: `);
  a.attr('href', msg.url);
  li.append(a);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('input[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('send location');
    alert('Unable to fetch location!');
  })
});