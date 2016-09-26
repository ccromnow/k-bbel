// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'MjI5ODc0NTcyMzY5OTg1NTM2.CsptOQ.6JAN2Y0YJLQM-07ffYAqPym54jU';
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === 'Annie Lööf') {
    message.reply('Det är bara käbbel');
  }
  if (message.content === 'klimatrapport') {
    message.reply('jag har läst den där kanske flera gånger än vad du har...');
  }
  if (message.content === 'kaxiga jävel') {
    message.reply('Robert är en sån kaxig jävel');
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