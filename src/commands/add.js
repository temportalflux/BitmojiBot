const lodash = require('lodash');
const path = require('path');
const Sql = require('sequelize');

module.exports = {
	command: 'add [name] [url]',
	desc: 'Submit a image for usage via the get command.',
	builder: (yargs) => yargs,
	handler: async (argv) =>
	{
		if (!argv.message.guild.available) { return; }

		const attachmentList = lodash.toPairs(argv.message.attachments);
		// Cannot have more than 1 image in an upload
		if (attachmentList.length >= 2)
		{
			await argv.message.reply("Please provide only 1 image.");
			return;
		}

		var imageRefData = undefined;
		// No attachment, must have link
		if (attachmentList.length <= 0)
		{
			if (!argv.name || !argv.url)
			{
				await argv.message.reply("If you do not attach an image, you must provide a name and link.");
				return;
			}

			imageRefData = {
				guild: argv.message.guild.id,
				name: argv.name.trim().replace(' ', '-'),
				url: argv.url,
			};
		}
		// 1 attachment, use it
		else
		{
			const attachment = attachmentList.shift()[1];
			const extension = path.extname(attachment.filename);
			imageRefData = {
				guild: argv.message.guild.id,
				name: attachment.filename.slice(0, extension.length),
				url: attachment.url,
			};
		}

		if (imageRefData)
		{
			const existingEntry = await argv.application.database.models.imageReference.findOne({
				where: {
					guild: { [Sql.Op.eq]: imageRefData.guild },
					name: { [Sql.Op.eq]: imageRefData.name },
				}
			});
			if (existingEntry)
			{
				await argv.message.reply(`There is already an image with the name "${imageRefData.name}".`);
				return;
			}
			await argv.application.database.models.imageReference.findOrCreate(imageRefData);
			await argv.message.reply(`Your image has been saved as "${imageRefData.name}".`);
		}
	}
};