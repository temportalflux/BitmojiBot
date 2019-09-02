const DBL = require('discordbot-lib');
const Secrets = require('../secrets.json');
const path = require('path');

class BitmojiBot extends DBL.Application
{

	constructor(withService)
	{
		super({
			applicationName: 'bitmojibot',
			discordToken: Secrets.token,
			commands: {
				prefix: 'bitmoji',
				directory: path.join(__dirname, 'commands'),
			},
			databaseModels: require('./models/index.js'),
			databaseLogging: false,
			logger: withService
				? DBL.Service.Logger(require('../package.json').serviceName)
				: undefined,
		});
	}

	// Override from DBL.Application
	onBotPrelogin(bot)
	{
		super.onBotPrelogin(bot);
		bot.on('removedFromGuild', this.onRemovedFromGuild.bind(this));
	}

	async onRemovedFromGuild(guild)
	{
		await this.database.at('image').destroy(DBL.Utils.Sql.createSimpleOptions({ guild: guild.id }));
	}

}

module.exports = BitmojiBot;