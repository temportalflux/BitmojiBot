const lodash = require('lodash');
const { TemplateCommands } = require('discordbot-lib');
const Command = TemplateCommands.import;

const builder = lodash.assign(
	Command.builder, {
		// No custom params
	}
);

module.exports = {
	command: TemplateCommands.helpers.createCommand('import', builder),
	desc: 'Imports a json representation of all images.',
	builder: builder,
	handler: Command.funcTemplate('image', {
		getFilterFromJson: (entry) => ({
			name: entry.name,
		}),
		createEntryFromJson: (entry) => ({
			name: entry.name,
			url: entry.url,
		}),
		onSuccess: async (argv) => {
			await argv.message.reply('I have imported the requested images :)');
		},
	}),
};