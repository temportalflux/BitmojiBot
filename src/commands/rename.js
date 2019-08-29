const Sql = require('sequelize');

module.exports = {
	command: 'rename <nameOld> <nameNew>',
	desc: 'Rename an image to a new unique name.',
	builder: (yargs) => yargs,
	handler: async (argv) =>
	{
		if (!argv.message.guild.available) { return; }

		if (!argv.nameOld || !argv.nameNew)
		{
			await argv.message.reply("Please provide an image names so I can modify the correct entry.");
			return;
		}

		const oldName = `${argv.nameOld}`.trim().replace(' ', '-');
		const newName = `${argv.nameNew}`.trim().replace(' ', '-');
		
		const srcEntry = await argv.application.database.models.imageReference.findOne({
			where: {
				guild: { [Sql.Op.eq]: argv.message.guild.id },
				name: { [Sql.Op.eq]: oldName },
			}
		});
		if (!srcEntry)
		{
			await argv.message.reply(`There is no image with the name "${oldName}".`);
			return;
		}

		const destEntry = await argv.application.database.models.imageReference.findOne({
			where: {
				guild: { [Sql.Op.eq]: argv.message.guild.id },
				name: { [Sql.Op.eq]: newName },
			}
		});
		if (destEntry)
		{
			await argv.message.reply(`There is already an image with the name "${newName}".`);
			return;
		}
		await srcEntry.update(
			{ name: newName },
			{ fields: ['name'] }
		);
		await argv.message.reply(`The image formerly named "${oldName}" is now named "${newName}".`);
	}
};