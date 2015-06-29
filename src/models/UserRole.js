"use strict";

module.exports = function(sequelize, DataTypes) {
  var UserRole = sequelize.define("UserRole", {
  },{
    timestamps: false
  });

  return UserRole;
};