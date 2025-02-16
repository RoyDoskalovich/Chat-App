const messageService = require("../services/message.js");
const {getUserFromToken} = require("./token");


const sendMessage = async (req, res) => {
    try {
        const {id} = req.params;
        const {userProfileId} = await getUserFromToken(req)
        const newMessage = await messageService.sendMessage(
            req.body.msg, id, userProfileId
        )
        res.status(200).send(newMessage);
    } catch (error) {
        console.log("sendMessage", error)
        if (error.message === 'Failed to send message') {
            res.status(408).json({error: 'Username already exist'});
        }
    }
}

const getMessages = async (req, res) => {
    try {
        const {id} = req.params;
        const messages = await messageService.getMessages(id)
        res.status(200).send(messages);
    } catch (error) {
        if (error.message === 'Failed to fetch messages') {
            res.status(408).json({error: 'Failed to fetch messages'});
        }
    }
}

module.exports = {sendMessage, getMessages}