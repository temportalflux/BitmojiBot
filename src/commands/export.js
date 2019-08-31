const Sql = require('sequelize');
const Discord = require('discord.js');

module.exports = {
	command: 'export',
	desc: 'Exports a json representation of all images associated with this server.',
	builder: {},
	handler: async (argv) =>
	{
		if (!argv.message.guild.available) { return; }

		const exportedObject = await argv.application.database.export(
			'image',
			{
				where: { guild: { [Sql.Op.eq]: argv.message.guild.id } },
				attributes: ['name', 'url'],
			}
		);
		await argv.message.reply("Here is your exported data file", {
			files: [
				new Discord.Attachment(
					Buffer.from(JSON.stringify(exportedObject)),
					`${argv.message.guild.name.replace(' ', '-').toLowerCase()}.json`
				)
			]
		});
	}
};