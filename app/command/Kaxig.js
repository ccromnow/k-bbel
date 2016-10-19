module.exports = function () {
	var module = {};

	module.run = function(message, callback) {
		callback.reply('Robert är en kaxig jävel...');
	}

    return module;
};