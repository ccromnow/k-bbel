module.exports = function() {
	var module = {};
	var userCommand = null;
	var unirest = require('unirest');
	var moment = require('moment');
	var querystring = require('querystring');
	var igdbUrl = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/"
    
    var handleRespone = function(response, message) {
    	if (response.status == 200 && response.body.length) {
    		return buildUserResponse(response.body)
    	} else {
    		return 'Kunde inte hitta '+message;
    	}
    }

    var buildUserResponse = function(data) {
    	var release = '';
    	if (typeof data[0].release_dates !== 'undefiend') {
	    	for (var i = 0; i < data[0].release_dates.length; i++) {
	    		
	    		var found = false;
	    		var datum = moment(data[0].release_dates[i].date);
	    		var past = (datum.isBefore(moment())) ? 'was' : 'is';

	    		if (data[0].release_dates[i].region == 8) {
	    			release += ' And '+past+' released world wide on '+datum.format('LLLL')+' ('+datum.fromNow()+').';
	    			found = true;
	    		}
	    		if (data[0].release_dates[i].region == 1) {
	    			release += ' And '+past+' released in Europe on '+datum.format('LLLL')+' ('+datum.fromNow()+').';
	    			found = true;
	    		}

	    		if (found && data[0].release_dates[i].platform == 6) {
	    			release += ' (ON PC)';
	    		}

	    		if (found && data[0].release_dates[i].platform == 14) {
	    			release += ' (ON MAC)';
	    		}
	    	}
    	} else {
    		release = ' I have no information about that shit.';
    	}

    	return 'The game: '+data[0].name+'. '+release;
    }

	module.setCommand = function(command) {
		userCommand = command;
	}

	module.help = function() {
		var helptext = 'Get game info, type: !gameinfo {gamename}';
		userCommand.respond(helptext);
	}

	module.run = function() {
		if (!userCommand) {
			return;
		}

		var message = userCommand.getQuery();
		
		var query = {
			fields: '*',
			limit: 3,
			offset: 0,
			order: 'release_dates.date%3Adesc',
			search: message
		};

		unirest.get(igdbUrl + querystring.stringify(query))
		.header("X-Mashape-Key", process.env.MASHAPE_KEY)
		.header("Accept", "application/json")
		.end(function (result) {
			return handleRespone(result, message);
		});
	}

    return module;
};