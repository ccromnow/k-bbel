// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'MjI5ODc0NTcyMzY5OTg1NTM2.CsptOQ.6JAN2Y0YJLQM-07ffYAqPym54jU';
const Discord = require('discord.js');
const client = new Discord.Client();
const mongodb = require('mongodb');
const db = require('monk')(process.env.MONGODB_URI);
const raids = db.get('raids');
const Kabbel = require("./app/kabbel.js")(raids);

client.on('ready', () => {

});

client.on('message', message => {

	var msgContent = message.content;
	var actorName = message.author.username;
	var resp = false;

	if (msgContent.split(' ').length === 3) {
		var raidName = msgContent.split(' ')[2];

		if (msgContent.indexOf('create raid') !== -1) {
			resp = Kabbel.creatRaid(raidName, actorName, message);
		}

		if (msgContent.indexOf('remove raid') !== -1) {
			resp = Kabbel.removeRaid(raidName, actorName, message);
		}

		if (msgContent.indexOf('signup raid') !== -1) {
			resp = Kabbel.signUpForRaid(raidName, actorName, message);
		}

		if (msgContent.indexOf('unsign raid') !== -1) {
			resp = Kabbel.unsignForRaid(raidName, actorName, message);
		}

		if (msgContent.indexOf('info raid') !== -1) {
			resp = Kabbel.getRaidInfo(raidName, message);
		}

		if (msgContent.indexOf('list all raids') !== -1) {
			resp = Kabbel.listRaids(message);
		}
	}
});

client.login(token);



var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {
	// ejs render automatically looks in the views folder
	res.render('index');
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});