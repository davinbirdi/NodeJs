// Clientside JavaScript



// Initializing socket and connection to server
var socket = io.connect('http://localhost:7777');
socket.on('connect', function(data){
    socket.emit('join', 'Hello Serverboi from a clientboi');
    console.log('clientboi has connected');
});


var client_username;
// jQuery: When the Submit button is pressed send 'username' to server.
$('#formname').submit(function() {
    console.log('username submit');
    // set var 'message' to be the values within the HTML ID #message
    client_username = $('#username').val();
    // Socket emits 'messages' to server
    socket.emit('enter_username', client_username);
    
    // Hiding the Name input and showing the message spot
    $('#namebox').hide(10);
    $('#messagebox').show(10);

    return false;
});


// jQuery: When the Submit button is pressed send 'messages' to server.
$('#formchat').submit(function() {
    console.log('submit hit');
    // set var 'message' to be the values within the HTML ID #message
    var message = $('#message').val();
    // Socket emits 'messages' to server *can have broadcast ti everyone to decentralize from server
    socket.emit('messages', client_username, message);
    this.reset();
    return false;
});




// Listens for "thread" event and update messages on html page
socket.on('thread', function(data, username){
    console.log('lets write the data: ' + data);
    if(username == client_username)
        $('#thread').append('<li float="left">' + username + ' (me) : ' + data +  '</li>');
    else 
        $('#thread').append('<li>' + username + ': ' + data +  '</li>');
});

// Keep Scroll at bottom. From Stack overflow not sure how it works
socket.on('thread', function(){
     $("#thread").scrollTop($("#thread")[0].scrollHeight);
});

