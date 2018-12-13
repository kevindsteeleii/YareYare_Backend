'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID    
    },
    name: { 
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: [5, 150]
      }
    },
    details: { 
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    notes: { 
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    steps: DataTypes.ARRAY(DataTypes.STRING),
    importance: {
      type: DataTypes.STRING,
      defaultValue: 'AVERAGE' // *NOTE: for front-end --should only be AVERAGE, NOT-IMPORTANT, IMPORTANT
    },
    urgent: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dueDate: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    dueTime: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, { foreignKey: 'userId'})
  };
  return Task;
};