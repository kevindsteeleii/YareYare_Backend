const jwt = require('jsonwebtoken'),
   SECRET = process.env.SECRET || 'secret'

module.exports = {
  verifyToken (req, res, next) {
    const authHeader = req.headers['authorization']

    if (typeof authHeader !== 'undefined'){
      const bearer = authHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
      next()
    } else {
      res.sendStatus(403)
    }
  }, // HOF used to invoke callback, also makes callbacks have to adhere to uniform args to be passed
  authVerifyToken(req, res, token, cb){
    jwt.verify(token, SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        cb(req, res)
      }
    })
  }
}