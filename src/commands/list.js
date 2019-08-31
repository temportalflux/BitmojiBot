const lodash = require('lodash');
const { TemplateCommands } = require('discordbot-lib');

module.exports = lodash.assign(
	{
		desc: 'Lists all of the images for the server.',
	},
	TemplateCommands.list(
		{
			name: 'list',
			options: '',
			builderBlock: {},
		},
		'image', ['name'], (model) => model.name
	)
);