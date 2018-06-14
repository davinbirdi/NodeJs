// Serverside Javascript


var express = require('express');
var app = express();

// Create server using http module and express module
var server = require('http').createServer(app);
// create a socket 'plug' from the socket module and the server
var io = require('socket.io')(server);

// Send the html file when the express obj gets res??
app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/www/index.html');
});

app.use(express.static('www'));

// Socket.io applications:
io.on('connection', function(client){
    console.log('Client connected');
    
    client.on('join', function(data){
        console.log(data);
    });

    // Server receiving 'messages' and emitting the content as 'thread'
    client.on('messages', function(data){
        console.log("submit recieved" + data);
        client.emit('thread', data);
        client.broadcast.emit('thread', data);
    })
});

server.listen(7777);
console.log('working on port 7777 boys');