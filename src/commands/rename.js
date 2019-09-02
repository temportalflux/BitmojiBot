const lodash = require('lodash');
const { TemplateCommands } = require('discordbot-lib');
const Command = TemplateCommands.rename;

const builder = lodash.assign(
	Command.builder, {
		// No custom params
	}
);

module.exports = {
	command: TemplateCommands.helpers.createCommand('rename', builder),
	desc: 'Rename an image to a new unique name.',
	builder: builder,
	handler: Command.funcTemplate('image'),
};