const GameLookup = require("./command/GameLookup.js");

module.exports = function (storage) {
    var module = {};
    var dbRaids = storage;
    var commands = ['!gameinfo'];

    commands['!gameinfo'] = GameLookup;

	module.isACommand = function(command) {
		return commands[command] !== undefined;
	}

	module.runCommand = function(command, callback) {
		var commandType = command.split(' ')[0].slice(1);
		var commandQuery = command.split(' ').slice(1);

		return commands[commandType].run(commandQuery, callback);
	}

    return module;
};