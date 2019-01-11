
// We need to be able to access the Service 
//that we just created so let's pull that in
var GoalService = require('../services/goal.service.js');

// Make sure to save the context of 
//this module inside the _this variable
_this = this

exports.getGoals = async function (req, res, next) {

    // We're going to use ternary to check 
    //the existence of the query parameters
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var goals = await GoalService.getGoals({}, page, limit)

        // Return the goals list with the appropriate 
        //HTTP Status Code and Message.
        return res.status(200).json({ status: 200, data: goals, message: "Succesfully Goals Recieved" });

    } catch (e) {

        //Return an Error Response Message 
        //with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.createGoal = async function (req, res, next) {

    // Note: Req.Body contains the form submit values.
    var goal = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }

    try {

        // Calling the Service function 
        //with the new object from the Request Body
        var createdGoal = await GoalService.createGoal(goal)
        return res.status(201).json({ status: 201, data: createdGoal, message: "Succesfully Created Goal" })
    } catch (e) {

        //Return an Error Response Message 
        //with Code and the Error Message.
        return res.status(400).json({ status: 400, message: "Goal Creation was Unsuccesfull, I am sorry :( " })
    }
}

exports.updateGoal = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var id = req.body._id;

    console.log(req.body)

    var goal = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try {
        var updatedGoal = await GoalService.updateGoal(goal)
        return res.status(200).json({ status: 200, data: updatedGoal, message: "Succesfully Updated Goal" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removeGoal = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await GoalService.deleteGoal(id)
        return res.status(204).json({ status: 204, message: "Succesfully Deleted Goal" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}