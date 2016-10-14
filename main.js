// the token of your bot - https://discordapp.com/developers/applications/me
const token = process.env.DISCORD_TOKEN;
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

	if (msgContent[0] == '!') {
		var command = msgContent.split(' ')[0];
		if (Kabbel.isACommand(command)) {
			Kabbel.runMessage(msgContent, message);
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