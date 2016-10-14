module.exports = function () {
	var module = {};

	module.run = function(message, callback) {
		callback.reply('Robert än en kaxig jävel...');
	}

    return module;
};