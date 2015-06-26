"use strict";

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
  	roleType: { field: 'role_type', type: DataTypes.STRING }
  }, {
    timestamps: false,
    underscored: true
  });

  return Role;
};