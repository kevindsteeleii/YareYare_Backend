const express = require('express'),
       router = express.Router()
        User = require('../models').User,
         jwt = require('jsonwebtoken'),
         SECRET =  process.env.SECRET || 'secret'

router
  .post('/login', (req, res, next) => {
    User.findOne(
      {
        where: {
          username: req.body.user.username
        }
      }
    ).then(user => {
      if (!user) {
        res.status(401).send('User could not be found')
      } else if (!user.validPass(req.body.user.password)) {
        res.status(401).send('Invalid password.')
      } else {
        jwt.sign({ user }, SECRET, /*{ expiresIn: '30m' }, */(err, token) => {
          if (token) {
            res.json({ token, user })
          } else {
            res.status(403).json(err)
          }
        })
      }
    }).catch(next)
  })

  module.exports = router