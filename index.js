const express = require('express'),
          app = express(),
       morgan = require('morgan'),
         cors = require('cors'),
   bodyParser = require('body-parser'),
   authRouter = require('./router/AuthRouter'),
   userRouter = require('./router/UserRouter'),
   taskRouter = require('./router/TaskRouter'),
//    Sequelize = require('sequelize'),
         PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(morgan('tiny'))

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.listen(PORT, () => { console.log(`Running on port ${PORT}...`)})
