const lodash = require('lodash');
const { TemplateCommands } = require('discordbot-lib');
const Command = TemplateCommands.export;

const builder = lodash.assign(
	Command.builder, {
		// No custom params
	}
);

module.exports = {
	command: TemplateCommands.helpers.createCommand('export', builder),
	desc: 'Exports a json representation of all images associated with this server.',
	builder: builder,
	handler: Command.funcTemplate('image', ['name', 'url'],
		(argv) => argv.message.guild.name.replace(' ', '-').toLowerCase()
	),
};