// Clientside JavaScript



// Initializing socket and connection to server
var socket = io.connect('http://localhost:7777');
socket.on('connect', function(data){
    socket.emit('join', 'Hello Serverboi from clientboi');
});


// jQuery: When the Submit button is pressed send 'username' to server.
$('#formname').submit(function() {
    console.log('username submit');
    // set var 'message' to be the values within the HTML ID #message
    var username = $('#username').val();
    // Socket emits 'messages' to server
    socket.emit('enter_username', username);
    
    // Hiding the Name input and showing the message spot
    $('#namebox').hide(1000);
    $('#messagebox').show(1000);

    return false;
});


// jQuery: When the Submit button is pressed send 'messages' to server.
$('#formchat').submit(function() {
    console.log('submit hit');
    // set var 'message' to be the values within the HTML ID #message
    var message = $('#message').val();
    // Socket emits 'messages' to server *can have broadcast ti everyone to decentralize from server
    socket.emit('messages', message);
    this.reset();
    return false;
});



var objDiv = document.getElementById("#thread");



// Listens for "thread" event and update messages on html page
socket.on('thread', function(data, username){
    console.log('lets write the data: ' + data);
    $('#thread').append('<li>' + username + ': ' + data +  '</li>');
});

// Keep Scroll at bottom. From Stack overflow not sure how it works
socket.on('thread', function(){
     $("#thread").scrollTop($("#thread")[0].scrollHeight);
});

