var express = require('express')

var router = express.Router()

// Getting the Goal Controller that we just created

var GoalController = require('../../controllers/goal.controller.js');


// Map each API to the Controller Functions

router.get('/', GoalController.getGoals)

router.post('/', GoalController.createGoal)

router.put('/', GoalController.updateGoal)

router.delete('/:id', GoalController.removeGoal)


// Export the Router
module.exports = router;