// primarily used to quick test features or code snippets
const Sequelize = require('sequelize'),
         bcrypt = require('bcrypt'), // will be adding some hashing later, promise
             Op = Sequelize.Op,
     connection = new Sequelize('yareyare_dev', 'postgres', null, {
       host: '127.0.0.1',
       dialect: 'postgres'
     })

let correctPass = '123456'
let otherPass = 'slkjdflklskj'
     
const User = connection.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
      len: {
        args: [5, 50],
        msg: 'Username is too short/long needs to be between 5 and 50 characters.'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
      len: {
        args: [6, 20],
        msg: 'Length of password should be between 6 and 20 characters.'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  status: {
    type: Sequelize.ENUM,
    values: ['admin', 'user'],
    defaultValue: 'user',
    validate: {
      isAcceptableEnum(){
        let statusValues = ['admin', 'user']
        if(!statusValues.includes(this.status)){
          throw new Error ('Status is not an acceptable value.')
        }
      }
    }
  }
}, {
  hooks: {
    beforeCreate: (user, options) => {
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
})

User.prototype.validPass = function (plainTextPassword) {
  return bcrypt.compareSync(plainTextPassword, this.password)
}

const Task = connection.define('task', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 150]
    }
  },
  details: { 
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  notes: { 
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  steps: Sequelize.ARRAY(Sequelize.STRING),
  importance: {
    type: Sequelize.ENUM,
    values: ['not important', 'average', 'important'], // *NOTE: for front-end --should only be AVERAGE, NOT-IMPORTANT, IMPORTANT
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
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  dueDate: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  dueTime: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  }
}, {})
Task.belongsTo(User, { foreignKey: 'userId'})

connection.sync( {
  force: true, // will drop table(s) everytime it is remade
  logging: console.log
}).then( () => {
  return User.create({
    username: 'testName',
    password: '123456',
    email: '1@noway.com',
  }).then((user) => {
    // evaluate whether or not the password works
    console.log(`\n\nPassword match is: ${user.validPass(correctPass)}`) 
    return User.findAll().then(users => {
      users.forEach(user => {
        console.log(`${user.username} ${user.email}`)
      })
    })
    // return Task.create({
    //   name: 'Do the Dishes',
    //   userId: user.id,
    //   importance: 'important',
    //   steps:['clear the dishes', 'put dishes into the sink', 'fill the sink with soapy water', 'wash the dishes', 'dry and put them the up']
    // }).then((task)=> {
    //   return User.findById(task.userId)
    //   .then((user)=> {
    //     console.log(`User is named: ${user.username}`)
    //     return User.findAll({})
    //   })
    // })
  })
})
.catch( (err) => {
  console.log(err)
})