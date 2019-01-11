var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var GoalSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
})

GoalSchema.plugin(mongoosePaginate)
const Goal = mongoose.model('Goal', GoalSchema)

module.exports = Goal;