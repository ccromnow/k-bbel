// the token of your bot - https://discordapp.com/developers/applications/me
const token = process.env.DISCORD_TOKEN;
const Discord = require('discord.js');
const client = new Discord.Client();
const Kabbel = require("./app/kabbel.js")();
const Command = require("./app/command.js");
const Q = require('q');


client.on('ready', () => {

});

client.on('message', message => {
	var msgContent = message.content;
	if (msgContent[0] == '!') {
		
		var commandType = msgContent.split(' ')[0];
		var commandQuery = msgContent.split(' ').slice(1).join(' ');

		if (Kabbel.isACommand(commandType)) {
			var command = new Command(commandType, commandQuery, message);
			Kabbel.runCommand(command);
		}
	}
});

client.login(token);




/**
	
	Info page.

*/

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