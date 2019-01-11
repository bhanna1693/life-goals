// Access our newly created Mongoose Model
var Goal = require('../models/goal.model.js')

// Saving the context of this module inside the _this variable
_this = this

// Let's use an Async function to get the To Do List
exports.getGoals = async function (query, page, limit) {

    // We also want to set up options for the mongoose paginate
    var options = {
        page,
        limit
    }

    //Let's create a Try and Catch function 
    //that way we have some error handling set. 
    //Waiting for the promise
    try {
        var goals = await Goal.paginate(query, options)

        //Once the Mongoose promise is returned 
        //we're going to go ahead and return 
        //the Goal List it has produced 
        return goals;

    } catch (e) {

        //If the try didn't work we're going to 
        //go ahead and let the users know what kind of 
        //Error we have
        throw Error('Oh No! We got an error while Paginating our Goals, so sorry!')
    }
}

exports.createGoal = async function (goal) {

    // Creating a new Mongoose Object by using the new keyword
    var newGoal = new Goal({
        title: goal.title,
        description: goal.description,
        date: new Date(),
        status: goal.status
    })

    try {

        // Let's go ahead and save the Goal 
        var savedGoal = await newGoal.save()

        return savedGoal;
    } catch (e) {

        //if we can't create a Goal we want to throw an error 
        throw Error("Error while Creating Goal")
    }
}

exports.updateGoal = async function (goal) {
    var id = goal.id

    try {
        //Find the old Goal Object by the Id
        var oldGoal = await Goal.findById(id);
    } catch (e) {
        throw Error("Error occured while trying to Find the Goal")
    }

    // If no old Goal Object exists return false
    if (!oldGoal) {
        return false;
    }

    console.log(oldGoal)

    //Edit the Goal Object
    oldGoal.title = goal.title
    oldGoal.description = goal.description
    oldGoal.status = goal.status


    console.log(oldGoal)

    try {
        var savedGoal = await oldGoal.save()
        return savedGoal;
    } catch (e) {
        throw Error("And Error occured while updating the Goal");
    }
}

exports.deleteGoal = async function (id) {

    // Delete the Goal
    try {
        var deleted = await Goal.deleteOne({ _id: id })
        if (deleted.n === 0) {
            throw Error("Goal Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Goal")
    }
}