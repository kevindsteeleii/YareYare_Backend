 const express = require('express'),
        router = express.Router(),
taskController = require('../controllers/TaskController')

/*
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
  .patch((req, res) => {
    taskController.editTask(req.params.id, req.body.data.UserId, req.body.data.task)
    .then(task => res.json(task))
  })
  
router
  .route('/:id')
  .get((req, res) => {
    taskController.showTask(req.params.id)
    .then(task => res.json(task))
  })  
  .delete((req, res) => {
    taskController.removeTask(req.params.id)
    .then(noTask => res.json(noTask))
  })

router
  .route('/')
  .post((req, res) => {
    taskController.createTask(req.body.data.id, req.body.data.task)
    .then(task => res.json(task))
  })  

module.exports = router