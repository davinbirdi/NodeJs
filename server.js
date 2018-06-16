// Serverside Javascript


var express = require('express');
var app = express();

// Create server using http module and express module
var server = require('http').createServer(app);
// create a socket 'plug' from the socket module and the server
var io = require('socket.io')(server);

var username;

// Send the html file when the express obj gets res??
app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/www/index.html');
});

app.use(express.static('www'));

// Socket.io applications:
io.on('connection', function(client){
    console.log('A Client has connected');
    
    client.on('join', function(data){
        console.log(data);
    });

    client.on('enter_username', function(data){
        console.log('user connected: ' + data);
        username = data;
    });

    // Server receiving 'messages' and emitting the content as 'thread'
    client.on('messages', function(username, data){
        console.log("submit recieved from: " + username + ': '+ data);
        client.emit('thread', data, username);
        client.broadcast.emit('thread', data, username);
    });
});
server.listen(7777);
console.log('working on port 7777 boys');