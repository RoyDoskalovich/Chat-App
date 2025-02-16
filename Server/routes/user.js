const userController = require('../controllers/user.js')

const express = require('express')
const {isLoggedIn} = require("../controllers/token");
var router = express.Router();

router.route('/').post(userController.createUser)

router.get('/:id', isLoggedIn, userController.getUserDetails);

module.exports = router