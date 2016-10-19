module.exports = function(commandType, commandQuery, message) {
	var module = {};
	var type = commandType;
	var query = commandQuery;
	var responder = message;

	module.getType = function() {
		return type;
	}

	module.getQuery = function() {
		return query;
	}

	module.respond = function(string) {
		responder.reply(string);
	}

    return module;
};