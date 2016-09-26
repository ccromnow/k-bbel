module.exports = function (raids) {
    var module = {};
    var dbRaids = raids;

    var kabbelResponse = function(success, msg) {
    	this.success = success;
    	this.msg = msg;
    }

	module.listRaids = function(message) {
		dbRaids.count({}, function(err, count) {
			if (count) {
				dbRaids.find({}, 'name').then((docs) => {
					var raidNames = '';
					docs.forEach(function(element, index){
						raidNames += element.name;
						raidNames += ', ';
					});
					message.reply('Active raids: '+raidNames);
					//return new kabbelResponse(true, 'Active raids: '+raidNames);
				});
				
			} else {
				message.reply('There are no raids');
			}
		});
	}

	module.getRaidInfo = function(raidName, message) {
		dbRaids.count({name: raidName}, function(err, count) {
			if (count) {
				dbRaids.findOne({name: raidName}).then((docs) => {
					var raidNames = '';
					docs.players.forEach(function(element, index){
						raidNames += element;
						raidNames += ', ';
					});
					message.reply(raidName+' signups: '+raidNames);
				});
				
			} else {
				message.reply('There is no raid called '+raidName);
			}
		});
	}

	module.unsignForRaid = function(raidName, actor, message) {
		dbRaids.count({name: raidName}, function(err, count) {
			if (count) {
				dbRaids.update(
					{name: raidName},
					{ $pull: { players: { $in: [ actor ] } } }
				);
				message.reply(actor+' is now removed from raid: '+raidName);
				
			} else {
				message.reply('There is no raid called '+raidName);
			}
		});
	}

	module.signUpForRaid = function(raidName, actor, message) {
		dbRaids.count({name: raidName}, function(err, count) {
			if (count) {
				dbRaids.update(
					{name: raidName},
					{ $push: { players: actor } }
				);
				message.reply(actor+' is now signed up for raid: '+raidName);
				
			} else {
				message.reply('There is no raid called '+raidName);
			}
		});
	}

	module.removeRaid = function(raidName, actor, message) {

		dbRaids.count({name: raidName}, function(err, count) {
			if (count) {
				dbRaids.remove({ 
					name: raidName, 
					creator: actor 
				});
				message.reply('Removed the raid called: '+raidName);				
			} else {
				message.reply('There is no raid called '+raidName);
			}
		});
	}

	module.creatRaid = function(raidName, actor, message) {
		dbRaids.count({name: raidName}, function(err, count) {
			if (!count) {
				dbRaids.insert({ 
					name: raidName, 
					creator: actor,
					players: []
				});
				message.reply('Created the raid called: '+raidName);				
			} else {
				message.reply('There is already a raid called '+raidName);
			}
		});
	}
    return module;
};