"use strict";
const bcrypt = require("bcrypt");
let saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
          len: [5, 50]
        }
        // *NOTE: add a front-end validation or programmatially limit input
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true, // *NOTE: add a front-end validation or programmatially limit input
          len: [7, 254]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true, // *NOTE: add a front-end validation or programmatially limit input
          len: [8, 50]
        }
      }
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = bcrypt.hashSync(user.password, saltRounds);
        }
      }
    }
  );
  User.prototype.validPass = function(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  };
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task, {
      as: "Tasks",
      onDelete: "cascade",
      hooks: true
    });
  };
  return User;
};
