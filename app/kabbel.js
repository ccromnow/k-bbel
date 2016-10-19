const GameLookup = require("./command/GameLookup.js");
const Kaxig = require("./command/Kaxig.js");
const Meme = require("./command/MemeGenerator.js");

module.exports = function() {
    var commands = ['!gameinfo', '!kaxig', '!meme'];
    commands['!gameinfo'] = new GameLookup();
    commands['!kaxig'] = new Kaxig();
    commands['!meme'] = new Meme();

	module.isACommand = function(command) {
		return commands.indexOf(command) !== -1;
	}

	module.runCommand = function(command) {
		var selectedCommand = commands[command.getType()];
		selectedCommand.setCommand(command);
		if (command.getQuery() == 'help') {
			selectedCommand.help();
		} else {
			selectedCommand.run();
		}
	};

    return module;
};