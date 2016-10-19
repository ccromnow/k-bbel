module.exports = function() {
	var unirest = require('unirest');
	var sleep = require('co-sleep');
	var co = require('co');
	var module = {};
	var moment = require('moment');
	var querystring = require('querystring');
	var memecaptain = "http://memecaptain.com/gend_images";
	var userCommand = null;

	module.setCommand = function(command) {
		userCommand = command
	}

	var memes = [{
			pattern: /^(y u no) (.*)/i,
			help: 'y u no <b>{text}</b>',
			url: 'NryNmg',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^aliens? guy (.+)/i,
			help: 'aliens guy <b>{text}</b>',
			url: 'sO-Hng',
			build: function() {
				return getMemeParameters(this.url, '', this.$text1);
			}
		}, {
			pattern: /^((?:prepare|brace) (?:yourself|yourselves)) (.+)/i,
			help: 'brace yourself <b>{text}</b>',
			url: '_I74XA',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(.*) (all the .*)/i,
			help: '<b>{text}</b> all the <b>{things}</b>',
			url: 'Dv99KQ',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(i don'?t (?:always|normally) .*) (but when i do,? .*)/i,
			help: 'I don\'t always <b>{something}</b> but when I do <b>{text}</b>',
			url: 'V8QnRQ',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(.*) (\w+\stoo damn .*)/i,
			help: '<b>{text}</b> too damn <b>{something}</b>',
			url: 'RCkv6Q',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(not sure if .*) (or .*)/i,
			help: 'not sure if <b>{something}</b> or <b>{something else}</b>',
			url: 'CsNF8w',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(yo dawg,? .*) (so .*)/i,
			help: 'yo dawg <b>{text}</b> so <b>{text}</b>',
			url: 'Yqk_kg',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(all your .*) (are belong to .*)/i,
			help: 'all your <b>{text}</b> are belong to <b>{text}</b>',
			url: '76CAvA',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(one does not simply) (.*)/i,
			help: 'one does not simply <b>{text}</b>',
			url: 'da2i4A',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(if you .*\s)(.* gonna have a bad time)/i,
			help: 'if you <b>{text}</b> gonna have a bad time',
			url: 'lfSVJw',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(if .*), ((?:are|can|do|does|how|is|may|might|should|then|what|when|where|which|who|why|will|won't|would) .*)/i,
			help: 'if <b>{text}</b>, <b>{word that can start a question}</b> <b>{text}</b>?',
			url: '-kFVmQ',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^((?:how|what|when|where|who|why) the (?:hell|heck|fuck|shit|crap|damn)) (.*)/i,
			help: '<b>{word that can start a question}</b> the <b>{expletive}</b> <b>{text}</b>',
			url: 'z8IPtw',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(?:success|nailed it) when (.*) then (.*)/i,
			help: 'success when <b>{text}</b> then <b>{text}</b>',
			url: 'AbNPRQ',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(?:fwp|cry) when (.*) then (.*)/i,
			help: 'cry when <b>{text}</b> then <b>{text}</b>',
			url: 'QZZvlg',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^bad luck when (.*) then (.*)/i,
			help: 'bad luck when <b>{text}</b> then <b>{text}</b>',
			url: 'zl3tgg',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^scumbag(?: steve)? (.*) then (.*)/i,
			help: 'scumbag <b>{text}</b> then <b>{text}</b>',
			url: 'RieD4g',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(what if i told you) (.+)/i,
			help: 'what if I told you <b>{text}</b>',
			url: 'fWle1w',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(i hate) (.+)/i,
			help: 'I hate <b>{text}</b>',
			url: '_k6JVg',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(why can'?t (?:i|we|you|he|she|it|they)) (.+)/i,
			help: 'why can\'t <b>{personal pronoun}</b> <b>{text}</b>',
			url: 'gdNXmQ',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(.+),? (how (?:do (?:they|I)|does (?:he|she|it)) work\??)/i,
			help: '<b>{things}</b>, how do they work?',
			url: '3V6rYA',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(.+?(?:a{3,}|e{3,}|i{3,}|o{3,}|u{3,}|y{3,}).*)/i,
			help: '{text}<b>{3 x a|e|i|o|u|y}</b>{text}',
			url: 'L50mqA',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}, {
			pattern: /^(do you want .*) (because that'?s how .*)/i,
			help: 'do you want <b>{text}</b> because that\'s how <b>{text}</b>',
			url: 'bxgxOg',
			build: function() {
				return getMemeParameters(this.url, this.$text1, this.$text2);
			}
		}
	];

	function getMemeParameters(url, text1, text2) {
		return {
			private: true,
			src_image_id: url,
			captions_attributes: [{
				text: (text1 || '').trim(),
				top_left_x_pct: 0.05,
				top_left_y_pct: 0,
				width_pct: 0.9,
				height_pct: 0.25
			}, {
				text: (text2 || '').trim(),
				top_left_x_pct: 0.05,
				top_left_y_pct: 0.75,
				width_pct: 0.9,
				height_pct: 0.25
			}]
		}

	}

	function buildMemeRequestBody(query) {
		var match;
		var text;

		var foundMatch = memes.some(function(possibleMatch){
			text = possibleMatch.pattern.exec(query);
			if (!!text) {
				match = possibleMatch;
			}
			return !!text;
		});

		if (foundMatch) {
			for (var i in text) {
				match['$text' + i] = text[i];
			}
			return match.build();
		} else {
			return false;
		}
	}

	function sendPollRequest(url, attempt) {
		attempt = attempt || 1;
	
		if (attempt > 10) {
			clearTimeout(userCommand.timeoutid);
			return null;
		}

		unirest.get(url).followRedirect(false).end(function(result) {
			if (result.statusCode == 303) {
				userCommand.respond(result.headers.location);
				clearTimeout(userCommand.timeoutid);
			} else if (result.statusCode == 200) {
				var nextAttemptDelay = 250 * attempt;
				userCommand.timeoutid = setTimeout(sendPollRequest, nextAttemptDelay, url, attempt + 1);
			} else {
				userCommand.respond('Det gick åt helvete...');
				clearTimeout(userCommand.timeoutid);
			}
		});
	}

	module.help = function() {
		var helptext = 'Meme Commands: \n\n';
		memes.forEach(function(meme) {
			helptext += meme.help+'\n';
		});
		userCommand.respond(helptext);
	}

	module.run = function() {
		if (!userCommand) {
			return;
		}

		var requestBody = buildMemeRequestBody(userCommand.getQuery());

		if (requestBody) {
			unirest.post(memecaptain)
			.header({'Accept': 'application/json', 'Content-Type': 'application/json'})
			.send(requestBody)
			.end(function (result) {
				if (result.status == 202) {
					if (typeof result.headers.location !== 'undefined') {
						sendPollRequest(result.headers.location, 0)
					}
				}
				return "wubba lubba dub dub!";
			});
		} else {
			return 'Hittade inte någon meme...';
		}
	}

    return module;
};