const GameLookup = require("./command/GameLookup.js");
const Kaxig = require("./command/Kaxig.js");
const Meme = require("./command/MemeGenerator.js");

module.exports = function (storage) {
    var module = {};
    var dbRaids = storage;
    var commands = ['!gameinfo', '!kaxig', '!meme'];

    commands['!gameinfo'] = new GameLookup();
    commands['!kaxig'] = new Kaxig();
    commands['!meme'] = new Meme();

	module.isACommand = function(command) {
		return commands.indexOf(command) !== -1;
	}

	module.runCommand = function(command, callback) {
		var commandType = command.split(' ')[0];
		var commandQuery = command.split(' ').slice(1).join(' ');

		commands[commandType].run(commandQuery, callback);
	}

    return module;
};