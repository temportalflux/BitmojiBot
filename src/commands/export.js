const Sql = require('sequelize');
const Discord = require('discord.js');

module.exports = {
	command: 'export',
	desc: 'Exports a json representation of all images associated with this server.',
	builder: {},
	handler: async (argv) =>
	{
		if (!argv.message.guild.available) { return; }

		const {rows, count} = await argv.application.database.models.imageReference.findAndCountAll({
			where: {
				guild: { [Sql.Op.eq]: argv.message.guild.id },
			},
			attributes: ['name', 'url'],
		});
		
		const exportedJsonString = JSON.stringify(rows.map((model) => model.toJSON()));
		await argv.message.reply("Here is your exported data file", {
			files: [
				new Discord.Attachment(
					Buffer.from(exportedJsonString),
					`${argv.message.guild.name.replace(' ', '-').toLowerCase()}.json`
				)
			]
		});
	}
};