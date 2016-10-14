const GameLookup = require("./command/GameLookup.js");
const GameLookup2 = require("./command/GameLookup.js")();

module.exports = function (storage) {
    var module = {};
    var dbRaids = storage;
    var commands = ['!gameinfo'];

    console.log(GameLookup);
    console.log(GameLookup2);

	module.isACommand = function(command) {
		return commands.indexOf(command) !== -1;
	}

	module.runCommand = function(command, callback) {
		var commandType = command.split(' ')[0];
		var commandQuery = command.split(' ').slice(1).join(' ');

		if (commandType == '!gameinfo') {
			GameLookup.run(commandQuery, callback);
			GameLookup2.run(commandQuery, callback);
		}		
	}

    return module;
};