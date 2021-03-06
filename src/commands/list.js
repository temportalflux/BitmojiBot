const lodash = require('lodash');
const { TemplateCommands } = require('discordbot-lib');
const Command = TemplateCommands.list;

const builder = lodash.assign(
	Command.builder, {
		// No custom params
	}
);

module.exports = {
	command: TemplateCommands.helpers.createCommand('list', builder),
	desc: 'Lists all of the images for the server.',
	builder: builder,
	handler: Command.funcTemplate('image',
		['name'], (model) => model.name
	),
};