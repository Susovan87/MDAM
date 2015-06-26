"use strict";

module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define("Device", {
    identifier: { type: DataTypes.STRING, unique: true, allowNull: false },
    model: { type: DataTypes.STRING },
    os: { type: DataTypes.STRING }
  }, {
  	underscored: true,
  	paranoid: true,
    classMethods: {
      associate: function(models) {
        Device.belongsTo(models.User, { through: 'DeviceUser', foreignKey: 'device_id' });
      }
    }
  });

  return Device;
};