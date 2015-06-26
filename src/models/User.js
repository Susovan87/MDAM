"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: { field: 'user_name', type: DataTypes.STRING },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, {
  	underscored: true,
  	paranoid: true,
  	classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Device, { through: 'DeviceUser', foreignKey: 'user_id' });
      }
    }
  });

  return User;
};
