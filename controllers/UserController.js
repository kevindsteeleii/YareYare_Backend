const User = require('../models').User,
 Sequelize = require('sequelize')
        // Op = Sequelize.Op

module.exports = {
  index() {
    return User.findAll()
  },
  newUser(userObj) {
    const { username, email, password } = userObj
    return User.create({...userObj})
  },
  showUser(id) {
    return User.findByPk(id)
  }
}