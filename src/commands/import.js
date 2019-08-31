const { Utils } = require('discordbot-lib');
const path = require('path');
const fetch = require('node-fetch');

module.exports = {
	command: 'import [url]',
	desc: 'Imports a json representation of all images.',
	builder: {},
	handler: async (argv) =>
	{
		if (!argv.message.guild.available) { return; }

		try
		{
			const fileInfo = Utils.Messages.getFileUrl(argv, requiresName = false);

			const extension = path.extname(fileInfo.url);
			if (extension !== '.json')
			{
				await argv.message.reply("The provided file must be a json file.");
				return;
			}

			const result = await fetch(fileInfo.url, { method: 'GET' });
			const data = await result.json();

			await argv.application.database.importWithFilter(
				'image', data,
				(entry) => Utils.Sql.createWhereFilter({
					guild: argv.message.guild.id,
					name: entry.name,
				}),
				(entry) => ({
					guild: argv.message.guild.id,
					name: entry.name,
					url: entry.url,
				})
			);
		}
		catch (e)
		{
			switch (e.error)
			{
				case 'TooManyAttachments':
				case 'MissingAttachment':
					await argv.message.reply(e.message);
				default:
					console.error(e);
					break;
			}
		}
	}
};