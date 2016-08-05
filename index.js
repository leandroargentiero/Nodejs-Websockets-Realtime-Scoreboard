var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use('/build', express.static(__dirname + '/build'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/build/scoreboard.html');
});

app.get('/scoreboard', function(req, res){
	res.sendFile(__dirname + '/build/scoreboard.html');
});

app.get('/admin', function(req, res){
	res.sendFile(__dirname + '/build/admin.html');
});

io.on('connection', function(socket){
	socket.on('selector-team1', function(msg){
		io.emit('selector-team1', msg);
		console.log(msg);
	});
	
	socket.on('selector-team2', function(msg){
		io.emit('selector-team2', msg);
		console.log(msg);
	});
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});