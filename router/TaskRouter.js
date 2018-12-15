    const express = require('express'),
           router = express.Router(),
   taskController = require('../controllers/TaskController'),
      verifyToken = require('../middleware/middleware').verifyToken,
  authVerifyToken = require('../middleware/middleware').authVerifyToken,
              jwt = require('jsonwebtoken'),
           SECRET =  process.env.SECRET || 'secret'

/* *NOTES: About fetches that cause mutations from the front end
    the requests must use specific headers

    Headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer <token-goes-here>'
    }
    
*/
/* and remember it must be JSON
 {
	"data": {
		"UserId": "8e0d4870-0011-11e9-b9f8-916796d7d583",
		"task": {
			"name": "Go to the store."	
		}
	}
}
*/

router
  .route('/:id/edit')
  .patch(verifyToken, (req, res) => {
    authVerifyToken(req, res, req.token, editTask)
  })
  
router
  .route('/:id')
  .get((req, res) => {
    taskController.showTask(req.params.id)
    .then(task => res.json(task))
  })  
  .delete(verifyToken, (req, res) => {
    authVerifyToken(req, res, req.token, removeTask)
  })

router
  .route('/')
  .post(verifyToken, (req, res) => {
    authVerifyToken(req, res, req.token, createTask)
  })
  
function createTask(req, res) {
  taskController.createTask(req.body.data.id, req.body.data.task)
  .then(task => res.json(task))
} 

function removeTask(req, res){
  taskController.removeTask(req.params.id)
  .then(noTask => res.json(noTask))
}

function editTask(req, res) {
  taskController.editTask(req.params.id, req.body.data.UserId, req.body.data.task)
  .then(task => res.json(task))
}

module.exports = router