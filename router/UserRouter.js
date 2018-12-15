   const express = require('express'),
			    router = express.Router(),
	userController = require('../controllers/UserController')

router
	.route('/signup')
	.post((req, res) => {
		userController.newUser(req.body.user)
		.then(user => res.json(user))
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

module.exports = router;
