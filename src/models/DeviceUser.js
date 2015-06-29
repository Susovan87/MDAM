"use strict";

module.exports = function(sequelize, DataTypes) {
	var DeviceUser = sequelize.define("DeviceUser", {
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
		nextId: {
			type: DataTypes.INTEGER
		}
	}, {
		timestamps: false
	});

	return DeviceUser;
};