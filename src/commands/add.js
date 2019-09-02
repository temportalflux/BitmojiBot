const lodash = require('lodash');
const { TemplateCommands } = require('discordbot-lib');
const Command = TemplateCommands.addFile;

const builder = lodash.assign(
	Command.builder, {
		// No custom params
	}
);

module.exports = {
	command: TemplateCommands.helpers.createCommand('add', builder),
	desc: 'Submit a image for usage via the get command.',
	builder: builder,
	handler: Command.funcTemplate('image', ['name']),
};