var express = require('express')

var router = express.Router()
var goal = require('./api/goal.route')


router.use('/goal', goal);


module.exports = router;