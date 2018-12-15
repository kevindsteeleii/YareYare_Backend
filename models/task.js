'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    name: { 
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
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
      type: DataTypes.ENUM('not important', 'average', 'important'),
      defaultValue: 'not important',
      validate: {
        isAcceptedEnum(){
          let enumValues = ['not important', 'average', 'important']
          if (!enumValues.includes(this.importance)) {
            throw new Error ('Importance entered is not an acceptable value.')
          }
        }
      }
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
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id'})
  };
  return Task;
};