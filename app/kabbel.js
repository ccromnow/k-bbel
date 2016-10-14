const GameLookup = require("./command/GameLookup.js");

module.exports = function (storage) {
    var module = {};
    var dbRaids = storage;
    var commands = [
    	'!gameinfo' => new GameLookup()
    ];

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