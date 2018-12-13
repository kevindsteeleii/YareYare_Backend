// primarily used to quick test features or code snippets
const Sequelize = require('sequelize'),
     connection = new Sequelize('demo', 'root', 'password')
     
const User = connection.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  }
})

connection.sync().then( function (){
  
})