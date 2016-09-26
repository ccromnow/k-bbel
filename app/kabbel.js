const db = require('monk')(process.env.MONGODB_URI);
const raids = db.get('raids')

(function() {
    var Kabbel = function() 
    {
    	this.listRaids = function() {

    	}

    	this.getRaidInfo = function(raidName) {

    	}

    	this.unsignForRaid = function(raidName, actor) {

    	}

    	this.signUpForRaid = function(raidName, actor) {

    	}

    	this.removeRaid = function(raidName, actor) {

    	}

    	this.creatRaid = function(raidName, actor) {

    	}
    }

    module.exports.getKabbel = function() {
        return Kabbel();
    }
}());