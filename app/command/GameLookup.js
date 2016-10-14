module.exports = function () {
	var module = {};
	var unirest = require('unirest');
	var moment = require('moment');
    
    var handleRespone = function(response, message) {
    	console.log('!lookup: Response status '+response.status);
    	if (response.status == 200) {
    		console.log('!lookup: Building response message');
    		return buildUserResponse(response.body)
    	} else {
    		return 'Kunde inte hitta '+message;
    	}
    }

    var buildUserResponse = function(data) {
    	var release = '';
    	for (var i = 0; i < data[0].release_dates.length; i++) {
    		
    		var found = false;
    		var datum = moment(data[0].release_dates[i].date);

    		if (data[0].release_dates[i].region == 8) {
    			release += ' And is released world wide on '+datum.format('LLLL')+' ('+datum.fromNow()+').';
    			found = true;
    		}
    		if (data[0].release_dates[i].region == 1) {
    			release += ' And is released in Europe on '+datum.format('LLLL')+' ('+datum.fromNow()+').';
    			found = true;
    		}

    		if (found && data[0].release_dates[i].platform == 6) {
    			release += ' (ON PC)';
    		}

    		if (found && data[0].release_dates[i].platform == 14) {
    			release += ' (ON MAC)';
    		}
    	}

    	return 'The game: '+data[0].name+'. '+release;
    }

	module.run = function(message, callback) {
		unirest.get("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=3&offset=0&order=release_dates.date%3Adesc&search=zelda")
		.header("X-Mashape-Key", process.env.MASHAPE_KEY)
		.header("Accept", "application/json")
		.end(function (result) {
			console.log('!lookup: Got reslut back');
			callback.reply(handleRespone(result, message));
		});
		console.log('!lookup: Ran command');
	}

    return module;
};