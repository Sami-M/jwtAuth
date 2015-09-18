"use strict";
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('user', {
		name_first			: DataTypes.STRING,
		name_last				: DataTypes.STRING,
		email		  			: DataTypes.STRING,
		password     		: DataTypes.STRING,
		role            : DataTypes.INTEGER
	}, 
	{
		classMethods: {
			generateHash : function(password) {
				return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
			},			
		},
		instanceMethods: {			
			validPassword : function(password) {
				return bcrypt.compareSync(password, this.localpassword);
			}
		}
		// getterMethods: {
		// 	someValue: function() {
		// 		return this.someValue;
		// 	}
		// },
		// setterMethods: {
		// 	someValue: function(value) {
		// 		this.someValue = value;
		// 	}
		// }
	});

	return User;
}

