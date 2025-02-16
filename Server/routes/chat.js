const chatController = require('../controllers/chat.js')
const messageController = require('../controllers/message.js')


const express = require('express')
const {isLoggedIn} = require("../controllers/token");
var router = express.Router();

router.route('/').post(isLoggedIn, chatController.createChat)

router.route('/:id/Messages').post(isLoggedIn, messageController.sendMessage)

router.get('/:id/Messages', isLoggedIn, messageController.getMessages)

router.get('/', isLoggedIn, chatController.getChats);

router.get('/:id', isLoggedIn, chatController.getChat);

router.get('/:id', isLoggedIn, chatController.deleteChat);

module.exports = router