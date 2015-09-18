var Role = function () {};
var configDB = require('../../config/database.js');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(configDB.url);
Role.prototype.seed = function() {
	console.log('Seeding Roles');
		var Role       = sequelize.import('../../app/models/role');
		Role.sync();

		var admin = Role.build({
			id: 1,
			role: 'admin'
		})

		var manager = Role.build({
			id: 2,
			role: 'manager'
		})

		var user = Role.build({
			id: 3,
			role: 'user'
		})

		admin.save();
		manager.save();
		user.save();
};

module.exports = new Role();