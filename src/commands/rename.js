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
		
		try
		{
			await argv.application.database.replaceField(
				'image',
				{ name: [oldName, newName] },
				{ guild: argv.message.guild.id }
			);
		}
		catch(e)
		{
			switch (e.code)
			{
				case 0:
					console.error(e.message);
					break;
				case 1:
					await argv.message.reply(e.message);
					break;
				case 2:
					await argv.message.reply(e.message);
					break;
				default:
					console.error(e);
					break;
			}
			return;
		}
		
		await argv.message.reply(`The image formerly named "${oldName}" is now named "${newName}".`);
	}
};