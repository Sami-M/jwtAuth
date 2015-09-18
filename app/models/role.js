"use strict";

module.exports = function(sequelize, DataTypes) {
	var Role = sequelize.define('role', {
		id           : { type: DataTypes.INTEGER, primaryKey: true},
		role 				 : DataTypes.STRING
	});

	return Role;
};