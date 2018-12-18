    const express = require('express'),
  				 router = express.Router(),
  						jwt = require('jsonwebtoken'),
  				 SECRET = process.env.SECRET || 'secret',
   userController = require('../controllers/UserController'),
	    verifyToken = require('../middleware/middleware').verifyToken,
	authVerifyToken = require('../middleware/middleware').authVerifyToken

router
	.route('/:id/edit')
	.patch(verifyToken, (req, res) => {
		authVerifyToken(req, res, req.token, editUser)
	})

router
	.route('/:id')
	.get((req, res) => {
		userController.showUser(req.params.id).then(user => res.json(user))
	})  

router
	.route('/')
	.get((req, res) => {
		userController.index().then(users => {
			res.json(users)
		})
	})

function editUser(req, res) {
	userController.editUser(req.params.id, req.body.user)
	.then(user => res.json(user))
}

module.exports = router;
