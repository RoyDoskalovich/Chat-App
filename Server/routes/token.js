const tokenController = require('../controllers/token.js')

const express = require('express')
var router = express.Router();

router.route('/').post(tokenController.createToken)

router.route('/Firebase').post(tokenController.setFirebaseToken)

module.exports = router