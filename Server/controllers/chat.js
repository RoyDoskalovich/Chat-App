const chatService = require("../services/chat.js");
const {getUserFromToken} = require("./token.js");

const getChat = async (req, res) => {
    try {
        // Extract the id from the request parameters
        const {id} = req.params;
        const {username} = await getUserFromToken(req)
        // Query the user with the provided id
        const chatData = await chatService.getChat(id, username)
        // Check if the user exists
        if (!chatData) {
            return res.status(404).json({error: 'Chat not found'});
        }
        // Return the user's profilePic and displayName

        res.status(200).json({
            Id: chatData.id,
            users: chatData.users
        });
    } catch (error) {
        if (error.message === 'Failed to fetch details') {
            res.status(401).json({error: 'Failed to fetch details'});
        }
    }
}

const getChats = async (req, res) => {
    try {
        // Extract the id from the request parameters
        const {username} = await getUserFromToken(req)
        // Query the user with the provided id
        const chats = await chatService.getChats(username)
        // Return the user's profilePic and displayName
        res.status(200).send(chats);
    } catch (error) {
        if (error.message === 'Failed to fetch details') {
            res.status(401).json({error: 'Failed to fetch details'});
        }
    }
}


const deleteChat = async (req, res) => {
    try {
        const {id} = req.params;
        const {username} = await getUserFromToken(req);

        await chatService.deleteChat(id, username);

        res.status(200).json({message: 'Chat deleted successfully'});
    } catch (error) {
        if (error.message === 'Chat not found') {
            res.status(404).json({error: 'Chat not found'});
        } else if (error.message === 'User not found') {
            res.status(404).json({error: 'User not found'});
        } else {
            res.status(500).json({error: 'Internal server error'});
        }
    }
};


const createChat = async (req, res) => {
    try {
        const {username} = await getUserFromToken(req)
        const newContactDetails = await chatService.createChat(
            req.body.username,
            username
        )
        const returnRes = {
            id: newContactDetails.id,
            user: {
                displayName: newContactDetails.user.displayName,
                profilePic: newContactDetails.user.profilePic,
                username: newContactDetails.user.username
            }
        }
        res.status(200).send(returnRes);
    } catch (error) {
        if (error.message === 'your a lonely guy' || error.message === 'Chat already exist') {
            res.status(400).json({error: 'Username already exists'});
        } else if (error.message === 'user not found') {
            res.status(404).json({error: 'User not found'});
        } else {
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

module.exports = {getChat, getChats, createChat, deleteChat}