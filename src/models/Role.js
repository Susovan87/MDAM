"use strict";

module.exports = function(sequelize, DataTypes) {
	var Role = sequelize.define("Role", {
		roleType: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		}
	}, {
		timestamps: false,
		classMethods: {
			associate: function(models) {
				Role.belongsToMany(models.User, {
		          through: {
		            model: models.UserRole
		          },
		          foreignKey: 'roleId'
		        });
			}
		}
	});

	return Role;
};