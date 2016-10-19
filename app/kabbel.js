const GameLookup = require("./command/GameLookup.js");
const Kaxig = require("./command/Kaxig.js");
const Meme = require("./command/MemeGenerator.js");

module.exports = function *() {
    var commands = ['!gameinfo', '!kaxig', '!meme'];
    var Q = require('q');

    commands['!gameinfo'] = new GameLookup();
    commands['!kaxig'] = new Kaxig();
    commands['!meme'] = new Meme();

	module.isACommand = function(command) {
		return commands.indexOf(command) !== -1;
	}

	module.runCommand = (Q.async(function *(command, callback) {
		var commandType = command.split(' ')[0];
		var commandQuery = command.split(' ').slice(1).join(' ');

		var command = commands[commandType];

		yield command.run(commandQuery, callback);
	}));

    return module;
};