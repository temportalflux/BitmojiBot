const Sql = require('sequelize');
const Discord = require('discord.js');

module.exports = {
	command: 'get <name>',
	desc: 'Send the image submited with the given name.',
	builder: (yargs) => yargs,
	handler: async (argv) =>
	{
		if (!argv.message.guild.available) { return; }

		if (!argv.name)
		{
			await argv.message.reply("Please provide an image name so I can produce it for you.");
			return;
		}
		const entryName = argv.name.trim().replace(' ', '-');
		const entry = await argv.application.database.models.imageReference.findOne({
			where: {
				guild: { [Sql.Op.eq]: argv.message.guild.id },
				name: { [Sql.Op.eq]: entryName },
			}
		});
		await argv.message.channel.send(entryName, {
			files: [
				entry.url
			]
		});
	}
};