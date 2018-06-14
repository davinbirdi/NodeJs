// Clientside JavaScript

// Initializing socket and connection to server
var socket = io.connect('http://localhost:7777');
socket.on('connect', function(data){
    socket.emit('join', 'Hello Serverboi from clientboi');
});


// When the Submit button is pressed send 'messages' to server.
$('form').submit(function() {
    console.log('submit hit');
    // set var 'message' to be the values within the HTML ID #message
    var message = $('#message').val();
    // Socket emits 'messages' to server
    socket.emit('messages', message);
    this.reset();
    return false;
});

// Listens for "thread" event to update messages on html page
socket.on('thread', function(data){
    console.log('lets write the data: ' + data);
    $('#thread').append('<li>' + data +  '</li>');
});