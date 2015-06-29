"use strict";

module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define("Device", {
    identifier: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING
    },
    os: {
      type: DataTypes.STRING
    }
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Device.belongsToMany(models.User, {
          through: {
            model: models.DeviceUser
          },
          foreignKey: 'deviceId'
        });
      }
    }
  });

  return Device;
};