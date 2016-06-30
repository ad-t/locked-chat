var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3001);

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var jsesc = require('jsesc'); // for escaping all the strings completely

app.get('/', function(request, response) {
    console.log("A request has been made!");
    response.writeHeader(200, { "Content-type": "text/html" } );
    response.write("Response works! You are awesome!");
    response.end()
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port') + " and available on: " + server.address().address);
});

io.on('connection', function (socket) {
    console.log('A user connected');
    // io.sockets.emit('connection', "Welcome!"); // msg);
    io.sockets.emit('yo', "yo");
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
    socket.on('chat', function (msg) {
        msg = jsesc(msg, {
            // 'escapeEverything': true
            'compact': true
        });
        io.sockets.emit('chat', msg); // msg);
        console.log("User says: " + msg);
    });
});
