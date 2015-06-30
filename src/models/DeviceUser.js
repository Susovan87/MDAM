"use strict";

module.exports = function(sequelize, DataTypes) {
	var DeviceUser = sequelize.define("DeviceUser", {
		id: { 
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		allocatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false
		},
		deAllocatedAt: {
			type: DataTypes.DATE
		},
		verifiedBy: {
			type: DataTypes.INTEGER
		},
		previousId: {
			type: DataTypes.INTEGER
		}
	}, {
		timestamps: false,
		classMethods: {
			associate: function(models) {
				DeviceUser.hasOne(DeviceUser, {
		          as: 'previous'
		        });
			}
		},
		defaultScope: {
		    where: {
		      deAllocatedAt: null
		    },
		    attributes: ['allocatedAt']
		}
	});

	return DeviceUser;
};