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
	
	socket.on('goals-team1-up', function(msg){
		io.emit('goals-team1-up', msg);
		console.log(msg);	  
	});
	socket.on('goals-team1-down', function(msg){
		io.emit('goals-team1-down', msg);
		console.log(msg);	  
	});
	socket.on('goals-team2-up', function(msg){
		io.emit('goals-team2-up', msg);
		console.log(msg);	  
	});
	socket.on('goals-team2-down', function(msg){
		io.emit('goals-team2-down', msg);
		console.log(msg);	  
	});
	
	socket.on('shots-team1-up', function(msg){
		io.emit('shots-team1-up', msg);
		console.log(msg);	  
	});
	socket.on('shots-team1-down', function(msg){
		io.emit('shots-team1-down', msg);
		console.log(msg);	  
	});
	socket.on('shots-team2-up', function(msg){
		io.emit('shots-team2-up', msg);
		console.log(msg);	  
	});
	socket.on('shots-team2-down', function(msg){
		io.emit('shots-team2-down', msg);
		console.log(msg);	  
	});
	
	socket.on('fouls-team1-up', function(msg){
		io.emit('fouls-team1-up', msg);
		console.log(msg);	  
	});
	socket.on('fouls-team1-down', function(msg){
		io.emit('fouls-team1-down', msg);
		console.log(msg);	  
	});
	socket.on('fouls-team2-up', function(msg){
		io.emit('fouls-team2-up', msg);
		console.log(msg);	  
	});
	socket.on('fouls-team2-down', function(msg){
		io.emit('fouls-team2-down', msg);
		console.log(msg);	  
	});
	
	
			  
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});