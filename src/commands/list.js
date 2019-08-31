const Sql = require('sequelize');

module.exports = {
	command: 'list [count] [page]',
	desc: 'Lists all of the images for the server.',
	builder: {
		count: {
			type: 'int',
			describe: 'The amount of items per page',
			default: 10,
		},
		page: {
			type: 'int',
			describe: 'The page offset',
			default: 0,
		},
	},
	handler: async (argv) =>
	{
		if (!argv.message.guild.available) { return; }

		const text = await argv.application.database.listAsText(
			'image',
			{ guild: { [Sql.Op.eq]: argv.message.guild.id } },
			['name'],
			(model) => model.name,
			argv.count,
			argv.page
		);

		await argv.message.channel.send(text);
	}
};