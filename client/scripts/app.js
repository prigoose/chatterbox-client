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
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      // data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
        }
        $('.username').on('click', app.handleUsernameClick);
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
    message.roomname = message.roomname || 'No room specified';
    message.text = message.text || 'No message specified';
    message.username = message.username || 'No username specified';
    $message = $('<div class="tweet"><p class="username">' + message.username + '</p><p id="message">' + message.text + '</p><p class="room">' + message.roomname + '</p></div>');
    if (app.users.followers.includes(message.username)) {
      // $message.toggleClass('friend');
      $message.toggleClass('friend');
      // $( "div.tumble" ).toggleClass( "bounce" )
    }
    $('#chats').append($message);
    
    
  },
  renderRoom: function(room) {
    $room = '<p>' + room + '</p>';
    $('#roomSelect').append($room);
  },
  handleUsernameClick: function() {
    app.users.followers.push($(this)[0].innerText); // inner Text is probably bad practice. Change later, maybe.
    // app.clearMessages();
    // app.fetch();
    // return true;
  },
  handleSubmit: function(text) {
    // window.location.search // al;skd=username;
    //indexOf = 
    // slice username out
    console.log('The handleSubmit function is running!');
        
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
});
// });