var app = {
  init: function() {
    $('form').on('submit', app.handleSubmit);
  },
  send: function(data) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(data) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  }, 
  renderMessage: function(message) {
    $message = '<div><p class="username">' + message.username + '</p><p id="message">' + message.text + '</p><p class="room">' + message.roomname + '</p></div>';
    $('#chats').append($message);
    $('.username').on('click', app.handleUsernameClick);
  },
  renderRoom: function(room) {
    $room = '<p>' + room + '</p>';
    $('#roomSelect').append($room);
  },
  handleUsernameClick: () => true,
  handleSubmit: () => true
};

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan',
};
 
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: data,
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});


$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: data', data.results[0]);
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});

