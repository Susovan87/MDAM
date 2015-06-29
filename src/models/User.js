"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Device, {
          through: {
            model: models.DeviceUser
          },
          foreignKey: 'userId' 
        }),
        User.belongsToMany(models.Role, {
          through: {
            model: models.UserRole
          },
          foreignKey: 'userId'
        });
      },
      matchCredential: function (identity, password, callback) {
        this.find({
          where: Sequelize.and(
            { password: password },
            Sequelize.or(
                { email: identity },
                { userName: identity }
              )
          )
        }).then(function(user){
          if(user){
            callback(null, user.getJsonData());
          }else{
            callback('wrong password');
          }
        }).catch(function (err) {
          callback(err);
        });
      }
    },
    instanceMethods: {
      getJsonData: function() {
        var user = this.toJSON();
        delete user['password'];
        delete user['createdAt'];
        delete user['updatedAt'];
        delete user['deletedAt'];
        return user;
      }
    }
  });

  return User;
};