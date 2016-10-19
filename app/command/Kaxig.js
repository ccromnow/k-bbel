module.exports = function() {
	var module = {};
	var userCommand = null;

	module.setCommand = function(command) {
		userCommand = command
	}

	module.run = function() {
		if (!userCommand) {
			return;
		}

		var response = 'Robert är en kaxig jävel...';
		userCommand.respond(response);
	}

	module.help = function() {
		if (!userCommand) {
			return;
		}

		var response = 'Robert är en kaxig jävel...';
		userCommand.respond(response);
	}

    return module;
};