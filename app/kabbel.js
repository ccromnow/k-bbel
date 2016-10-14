const GameLookup = require("./command/GameLookup.js");

module.exports = function (storage) {
    var module = {};
    var dbRaids = storage;
    var commands = ['!gameinfo'];

	module.isACommand = function(command) {
		return commands.indexOf(command) !== -1;
	}

	module.runCommand = function(command, callback) {
		var commandType = command.split(' ')[0];
		var commandQuery = command.split(' ').slice(1).join(' ');

		if (commandType == '!gameinfo') {
			return GameLookup.run(commandQuery, callback);
		}		
	}

    return module;
};