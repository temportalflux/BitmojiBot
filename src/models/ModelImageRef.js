const Sql = require('sequelize');

module.exports = {
	guild: {
		type: Sql.BIGINT,
		allowNull: false,
	},
	name: {
		type: Sql.TEXT,
		allowNull: false,
		unique: true,
	},
	url: {
		type: Sql.STRING,
		allowNull: false,
		unique: true,
	},
};