module.exports = function (raids) {
    var module = {};
    var dbRaids = raids;

    var kabbelResponse = function(success, msg) {
    	this.success = success;
    	this.msg = msg;
    }

	module.listRaids = function() {
		var res = yield dbRaids.find();
		if (res.should.have.length()) {
			var raidNames = '';
			dbRaids.find({}, 'name').then((docs) => {
				for (raidName in docs) {
					raidNames += raidName+', '
				}

			})
			return new kabbelResponse(true, 'Active raids: '+raidNames);
		} else {
			return new kabbelResponse(false, 'There are no raids');
		}
	}

	module.getRaidInfo = function(raidName) {
		var res = yield dbRaids.findOne({name: raidName});
		if (res.should.have.length(1)) {
			dbRaids.findOne({name: raidName}).then((doc) => {
				return new kabbelResponse(true, raidName+' signups: ');
			});
		} else {
			return new kabbelResponse(false, 'There is no raid called '+raidName);
		}
	}

	module.unsignForRaid = function(raidName, actor) {
		var res = yield dbRaids.findOne({name: raidName});
		if (res.should.have.length(1)) {
			dbRaids.update(
				{name: raidName},
				{ $pull: { players: { $in: [ actor ] } } }
			);
			return new kabbelResponse(true, actor+' is now removed from raid: '+raidName);
		} else {
			return new kabbelResponse(false, 'There is no raid called '+raidName);
		}
	}

	module.signUpForRaid = function(raidName, actor) {
		var res = yield dbRaids.findOne({name: raidName});
		if (res.should.have.length(1)) {
			dbRaids.update(
				{name: raidName},
				{ $push: { players: actor } }
			);
			return new kabbelResponse(true, actor+' is now signed up for raid: '+raidName);
		} else {
			return new kabbelResponse(false, 'There is no raid called '+raidName);
		}
	}

	module.removeRaid = function(raidName, actor) {
		var res = yield dbRaids.findOne({name: raidName});
		if (res.should.have.length(1)) {
			dbRaids.remove({ 
				name: raidName, 
				creator: actor 
			});
			return new kabbelResponse(true, 'Removed the raid called: '+raidName);
		} else {
			return new kabbelResponse(false, 'There is no raid called '+raidName);
		}
	}

	module.creatRaid = function(raidName, actor) {
		var res = yield dbRaids.findOne({name: raidName});
		if (res.should.have.length(1)) {
			return new kabbelResponse(false, 'There is already a raid called '+raidName);
		} else {
			dbRaids.insert({ 
				name: raidName, 
				creator: actor,
				players: []
			});
			return new kabbelResponse(true, 'Created a raid called: '+raidName);
		}
	}
    return module;
};