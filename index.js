var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var currentGame = [];

// DATABASE CONNECTION - MONGODB
mongoose.connect('leandroargentiero:herexamen@ds039431.mlab.com:39431/herexamenwebtech2');
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
	
	// EMIT CURRENT GAME TO NEW CONNECTIONS
	console.log('A new user connected');
    io.emit('getCurrentGame', currentGame);
	
	// NEW GAME TRIGGER WHEN ADMIN RESETS GAME
    socket.on('newGame', function(msg) {
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
        // SAVING MODEL
        newGame.save(function(err, newGame) {
            if (err) return console.error(err);
            io.emit('newGame', newGame);
            console.log("STARTED NEW GAME");
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
			currentGame = found;
        });
    });

    // TEAM2 FLAG & TEAM SELECTION
    socket.on('selector-team2', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            'team2.country': msg.country
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateGame', found);
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
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
			currentGame = found;
        });
    });

    // REALTIME UPDATE TEAM1
    socket.on('updateTeam1', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            'team1.updates': msg.update
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
            io.emit('updateRealtimeTeam1', found);
			currentGame = found;
        });
    });

    // REALTIME UPDATE TEAM2
    socket.on('updateTeam2', function(msg) {
        Game.findByIdAndUpdate(msg.id, {
            'team2.updates': msg.update
        }, function(err, data) {});
        Game.findById(msg.id, function(err, found) {
			currentGame = found;
            io.emit('updateRealtimeTeam2', found);
        });
    });
});

app.set('port', (process.env.PORT || 5000));

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

http.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});