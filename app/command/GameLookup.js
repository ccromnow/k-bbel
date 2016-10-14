module.exports = function () {
	var module = {};
	var unirest = require('unirest');
	var moment = require('moment');
    
    var handleRespone = function(response, message) {
    	if (response.status == 200) {
    		return buildUserResponse(response.body)
    	} else {
    		return 'Kunde inte hitta '+message;
    	}
    }

    var buildUserResponse = function(data) {
    	var release = '';
    	for (var i = 0; i < data[0].release_dates.length; i++) {
    		var datum = moment(data[0].release_dates[i].date);
    		if (data[0].release_dates[i].region == 8) {
    			release += 'And is released world wide on ';
    			relesee += datum.format('LLLL');
    			relesee += '('+datum.fromNow()+').';
    			break;
    		}
    		if (data[0].release_dates[i].region == 1) {
    			release += 'And is released in Europe on ';
    			relesee += datum.format('LLLL');
    			relesee += '('+datum.fromNow()+').';
    			break;
    		}
    	}

    	return 'The game: '+data[0].name+'. '+release;
    }

	module.run = function(message, callback) {
		unirest.get("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=3&offset=0&order=release_dates.date%3Adesc&search=zelda")
		.header("X-Mashape-Key", process.env.MASHAPE_KEY)
		.header("Accept", "application/json")
		.end(function (result) {
			callback.reply(handleRespone(result, message));
		});
	}

    return module;
};