const express = require('express')
var server = express()

const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({extended: true}))
server.use(express.json())

const cors = require('cors')
server.use(cors())

const customEnv = require('custom-env')
customEnv.env(process.env.NODE_ENV, './config')

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})

const Users = require('./routes/user.js')
server.use('/Users', Users)

const Tokens = require('./routes/token.js')
server.use('/Tokens', Tokens)

const Chats = require('./routes/chat.js')
const {User} = require("./models/user");
server.use('/Chats', Chats)

server.listen(process.env.PORT)

server.get('/', (_, res) => {
    res.redirect('http://localhost:3000');
});

module.exports = server;
