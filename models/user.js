'use strict';
const bcrypt = require('bcrypt')
let saltRounds = 10

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlphanumeric: true,
      len: [5-50]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlphanumeric: true,
      isEmail: true,
      len: [7-254]
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlphanumeric: true, // *NOTE: add a front-end validation
      len: [8-50]
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, saltRounds)
      }
    }
  });
  User.prototype.validPass = function (plainTextPassword, user) {
    return bcrypt.compareSync(plainTextPassword, user.password)
  }
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task, { as: 'Tasks', onDelete: 'cascade', hooks:true})
  };
  return User;
};