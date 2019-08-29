const Sql = require('sequelize');
const Discord = require('discord.js');
const http = require('http');
const {promisify} = require('util');
const lodash = require('lodash');
const path = require('path');

//const fetch = promisify(http.request);
var fetch = require('node-fetch');

module.exports = {
	command: 'import [url]',
	desc: 'Imports a json representation of all images.',
	builder: {},
	handler: async (argv) =>
	{
		if (!argv.message.guild.available) { return; }

		var fileUrl = undefined;
		const attachmentList = lodash.toPairs(argv.message.attachments);
		// No attachment, must have link
		if (attachmentList.length <= 0)
		{
			if (!argv.url)
			{
				await argv.message.reply("If you do not attach an file, you must provide a link.");
				return;
			}
			fileUrl = argv.url;
		}
		// Cannot have more than 1 file in an upload
		else if (attachmentList.length > 1)
		{
			await argv.message.reply("Please provide 1 and only 1 file.");
			return;
		}
		else
		{
			const attachment = attachmentList.shift()[1];
			fileUrl = attachment.url;
		}

		const extension = path.extname(fileUrl);
		if (extension !== '.json')
		{
			await argv.message.reply("The provided file must be a json file.");
			return;
		}

		const result = await fetch(fileUrl, {
			method: 'GET'
		});
		const data = await result.json();

		const entriesToAdd = [];
		for (const entry of data)
		{
			const instance = await argv.application.database.models.imageReference.findOne({
				where: {
					guild: argv.message.guild.id,
					name: entry.name,
					url: entry.url,
				},
				attributes: ['name', 'url']
			});
			if (instance === null)
			{
				entriesToAdd.push(entry);
			}
		}
		if (entriesToAdd.length > 0)
		{
			try
			{
				await argv.application.database.models.imageReference.bulkCreate(entriesToAdd);
			}
			catch (errors)
			{
				console.error(errors);
			}
		}

	}
};