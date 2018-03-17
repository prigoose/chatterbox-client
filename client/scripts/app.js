// $(document).ready(function() {

var app = {
  init: function() {
    $('form').on('submit', app.handleSubmit);    
    app.fetch();
    // var oldMessages = app.fetch();
    // console.log(oldMessages);
    $('.newTweets').on('click', app.addNewTweets);
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
  fetch: function(roomName) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i], roomName);
        }
        $('.username').on('click', app.handleUsernameClick);
        // for loop 
        for (var i = 0 ; i < app.rooms.length; i++) {
          $room = $('<option value="' + app.rooms[i] + '">' + app.rooms[i] + '</option>')
          if ($('#roomSelect option[value="' + app.rooms[i] +'"').length === 0) {
            $('#roomSelect').append($room);
          }
        }
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
  rooms: [],
  renderMessage: function(message, roomName) {
    message.roomname = message.roomname || 'No room specified';
    if (!(app.rooms.includes(message.roomname))) {
      app.rooms.push(message.roomname);
    }
    message.text = escape(message.text) || 'No message specified';
    message.username = message.username || 'No username specified';
    $message = $('<div class="tweet"><p class="username"></p><p id="message"></p><p class="room"></p></div>');
    $message.username.text
    if (app.users.followers.includes(message.username)) {
      $message.toggleClass('friend');
    }
    if (roomName === undefined || (roomName === message.roomname)) {
      $('#chats').append($message);
    }
    
  },
  renderRoom: function(room) {
    // $room = '<p>' + room + '</p>';
    // $('#roomSelect').append($room);
    var roomName = this.value;
    app.clearMessages();
    app.fetch(roomName);
  },
  handleUsernameClick: function() {
    var friendName = $(this)[0].innerText;
    var indexOfFriend = app.users.followers.indexOf(friendName);
    if (indexOfFriend === -1) {
      app.users.followers.push(friendName); // inner Text is probably bad practice. Change later, maybe. 
    } else {
      app.users.followers.splice(indexOfFriend, 1);
    }
    app.clearMessages();
    app.fetch();
    // return true;
  },
  handleSubmit: function(text) {
    console.log('The handleSubmit function is running!');
    // create object from inputs
    // console.log(prompt('What is your name?') || 'anonymous')
      var url = window.location.href
      var index = url.indexOf('username=');
      var username = url.slice(index + 9);
      var text = $('#target input').value
      var message = {
        username: username,
        text: text,
        roomname: null
      }
    app.send(object)
        
  },

  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  addNewTweets: function() {},
  users: {username: 'us', followers: []}
};

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan',
// };

app.init();
$(document).ready(function() {
  $('form').on('submit', app.handleSubmit);
  $('#roomSelect').on('change', app.renderRoom);
});
// });