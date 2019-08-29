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

		const {rows, count} = await argv.application.database.models.image.findAndCountAll({
			where: {
				guild: { [Sql.Op.eq]: argv.message.guild.id },
			},
			attributes: ['name'],
			offset: argv.page * argv.count,
			limit: argv.count,
		});
		const entries = rows.map((model) => model.name);
		await argv.message.channel.send(
			entries.length <= 0
			? "There are no entries here"
			: entries.reduce((accum, name) => `${accum}\n- ${name}`,
			`Page ${argv.page} (${argv.page * argv.count + 1} - ${(argv.page + 1) * argv.count}): (${count} total)`)
		);
	}
};