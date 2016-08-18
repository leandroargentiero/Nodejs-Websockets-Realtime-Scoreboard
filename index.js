var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var currentGame = [];

// DATABASE CONNECTION - MONGODB
mongoose.connect('mongodb://127.0.0.1/herexamenwebtech2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("You're connected to MongoDB!");
});

// SCHEMA FOR DATABASE
var gameSchema = mongoose.Schema({
    team1: {
        country: String,
        goals: Number,
        shots: Number,
        fouls: Number,
        updates: Array
    },
    team2: {
        country: String,
        goals: Number,
        shots: Number,
        fouls: Number,
        updates: Array
    }
});

// MODEL FOR DATABASE
var Game = mongoose.model('Game', gameSchema);

// WEBSOCKETS
io.on('connection', function(socket) {

    io.emit('getCurrentGame', currentGame);

    socket.on('reset', function(msg) {
        var newGame = new Game({
            team1: {
                country: "team1",
                goals: 0,
                shots: 0,
                fouls: 0,
				updates: Array
            },
            team2: {
                country: "team2",
                goals: 0,
                shots: 0,
                fouls: 0,
				updates: Array
            }
        });
        // model save
        newGame.save(function(err, newGame) {
            if (err) return console.error(err);
            io.emit('reset', newGame);
            console.log("RESET MATCH");
            currentGame = newGame._id;
            console.log(currentGame);
        });
    });

    // TEAM1 FLAG & TEAM SELECTION
    socket.on('selector-team1', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            'team1.country': msg.country
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });

    // TEAM2 FLAG & TEAM SELECTION
    socket.on('selector-team2', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            'team2.country': msg.country
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });

    // TEAM1 GOALS
    socket.on('goals-team1-up', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team1.goals': 1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });
    socket.on('goals-team1-down', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team1.goals': -1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });

    // TEAM2 GOALS
    socket.on('goals-team2-up', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team2.goals': 1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });
    socket.on('goals-team1-down', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team2.goals': -1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });

    // TEAM1 SHOTS
    socket.on('shots-team1-up', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team1.shots': 1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });
    socket.on('shots-team1-down', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team1.shots': -1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });

    // TEAM2 SHOTS
    socket.on('shots-team2-up', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team2.shots': 1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });
    socket.on('shots-team2-down', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team2.shots': -1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });

    // TEAM1 FOULS
    socket.on('fouls-team1-up', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team1.fouls': 1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });
    socket.on('fouls-team1-down', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team1.fouls': -1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });

    // TEAM2 FOULS
    socket.on('fouls-team2-up', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team2.fouls': 1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });
    socket.on('fouls-team1-down', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            $inc: {
                'team2.fouls': -1
            }
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });

    // REALTIME UPDATE TEAM1
    socket.on('updateTeam1', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            'team1.updates': msg.update
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });

    // REALTIME UPDATE TEAM2
    socket.on('updateTeam2', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            'team2.updates': msg.update
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
        });
    });



});

/*	
	socket.on('updateTeam1', function(msg){
		io.emit('updateTeam1', msg);
		console.log(msg);
	});
	
	socket.on('updateTeam2', function(msg){
		io.emit('updateTeam2', msg);
		console.log(msg);
	});

			  
});
*/

// ROUTING
app.use('/build', express.static(__dirname + '/build'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/build/scoreboard.html');
});

app.get('/scoreboard', function(req, res) {
    res.sendFile(__dirname + '/build/scoreboard.html');
});

app.get('/admin', function(req, res) {
    res.sendFile(__dirname + '/build/admin.html');
});

http.listen(3000, function() {
    console.log('App listening on *:3000');
});