const DBL = require('discordbot-lib');
const Secrets = require('../secrets.json');
const path = require('path');
const lodash = require('lodash');
const Sql = require('sequelize');

class BitmojiBot extends DBL.Application
{

	constructor()
	{
		super({
			applicationName: 'bitmojibot',
			discordToken: Secrets.token,
			commands: {
				prefix: 'bitmoji',
				directory: path.join(__dirname, 'commands'),
			},
			databaseModels: require('./models/index.js'),
		});
	}

	// Override from DBL.Application
	onBotPrelogin(bot)
	{
		super.onBotPrelogin(bot);
		bot.on('removedFromGuild', this.onRemovedFromGuild.bind(this));
	}

	onRemovedFromGuild(guild)
	{
		// TODO: Remove data regarding the guild
	}

}

new BitmojiBot();