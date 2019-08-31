const lodash = require('lodash');
const { TemplateCommands } = require('discordbot-lib');

module.exports = lodash.assign(
	{
		desc: 'Submit a image for usage via the get command.',
	},
	TemplateCommands.addFile('add', 'image')
);