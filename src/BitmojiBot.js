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
		bot.on('joinedGuild', this.onJoinedGuild.bind(this));
		bot.on('leftGuild', this.onLeftGuild.bind(this));
	}

	async onJoinedGuild(guild)
	{
		this.logger.info(`Joined guild "${guild.name}"#${guild.id}.`);
		await this.addGuildData(guild);
	}

	async onLeftGuild(guild)
	{
		this.logger.info(`Left guild "${guild.name}"#${guild.id}.`);
		await this.removeGuildData(guild);
	}

	async onRemovedFromGuild(guild)
	{
		this.logger.info(`Removed from guild "${guild.name}"#${guild.id}.`);
		await this.removeGuildData(guild);
	}

	async addGuildData(guild)
	{
	}

	async removeGuildData(guild)
	{
		this.logger.info(`Purging data for "${guild.name}"#${guild.id}.`);
		await this.database.at('image').destroy(DBL.Utils.Sql.createSimpleOptions({ guild: guild.id }));
	}

}

module.exports = BitmojiBot;