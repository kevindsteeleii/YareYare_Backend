const Sequelize = require('sequelize'),
             Op = Sequelize.Op,
           Task = require('../models').Task

module.exports = {
  createTask(userId, taskObj){
    const newTask = Task.build({
      ...taskObj, UserId: userId
    })
    newTask.userId = userId
    return newTask.save()
  },
  editTask(id ,userId, taskObj){
    return Task.findOne({
      where: {
        UserId: {
          [Op.eq]: userId
        },
        id: {
          [Op.eq]: id
        }
      }
    }).then(task => {
      task.set({ ...taskObj })
      return task.save()
    })
  },
  showTask(id){
    return Task.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    })
  },
  removeTask(id){
    return Task.findByPk(id)
    .then(task => task.destroy())
  }
}