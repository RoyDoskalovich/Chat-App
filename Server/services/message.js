const Message = require('../models/message.js')
const Chat = require('../models/chat.js')
const {User, UserProfile} = require("../models/user");
const firebaseService = require("./firebase");
const {onMessage} = require('../services/socket.js');


let id = 1
const sendMessage = async (message, chatId, userProfileId) => {
    const currentChat = await Chat.findById(chatId).populate('messages').populate({
        path: 'users',
        model: 'UserProfile'
    });
    if (!currentChat) {
        throw new Error('Failed to send message');
    }
    const newMessage = new Message({
        id, sender: userProfileId, content: message
    })
    id++
    await newMessage.save()
    currentChat.messages.push(newMessage)

    currentChat.lastMessage.id = newMessage.id
    currentChat.lastMessage.created = newMessage.created
    currentChat.lastMessage.content = newMessage.content

    await currentChat.save()

    const senderUserProfile = await UserProfile.findById(userProfileId)
    if (!senderUserProfile) throw new Error("Unknown sender UserProfile")
    const senderUsername = senderUserProfile.username
    console.log("--senderUsername:", senderUsername)

    console.log("--currentChat.users:", currentChat.users)


    console.log("--senderUserProfile.id:", senderUserProfile.id)
    const recipientUserProfile = currentChat.users.find(user => user._id.toString() !== senderUserProfile.id.toString());
    if (!recipientUserProfile) throw new Error("Unknown recipient UserProfile")
    console.log("--recipientUserProfile:", recipientUserProfile)

    const recipientUsername = recipientUserProfile.username
    console.log("--recipientUsername:", recipientUsername)
    await sendFirebaseMessage(recipientUsername, newMessage, senderUsername, chatId)

    return newMessage
}

// In prev version we also passed socket here
const getMessages = async (chatId) => {
    const chat = await Chat.findById(chatId)
        .populate({
            path: 'messages',
            populate: {
                path: 'sender',
                model: 'UserProfile',
                select: 'username',
            },
        });

    if (chat) {
        const formattedMessages = chat.messages.map(message => {
            return {
                id: message.id,
                created: message.created,
                sender: {
                    username: message.sender.username,
                },
                content: message.content,
            };
        });


        return formattedMessages;
    }

    throw new Error('Chat does not exist');
};

const sendFirebaseMessage = async (recipientUsername, message, senderUsername, chatId) => {
    console.log("recipientUsername::", recipientUsername)
    console.log("senderUsername::", senderUsername)
    const recipient = await User.findOne({username: recipientUsername})
    if (!recipient) {
        throw new Error('User doesnt exist')
    }
    const sender = await User.findOne({username: senderUsername})
    if (!sender) {
        throw new Error('User doesnt exist')
    }

    const recipientFirebaseToken = recipient.firebaseToken
    const senderFirebaseToken = sender.firebaseToken

    console.log("recipientFirebaseToken", recipientFirebaseToken)
    console.log("senderFirebaseToken", senderFirebaseToken)

    // Both clients are web typed.
    if (!recipientFirebaseToken && !senderFirebaseToken) {
        return
    }

    // Sender client is android type, recipient is web typed.
    if (!recipientFirebaseToken && senderFirebaseToken != null) {
        console.log('User is not an android user')

        const data = {sender: senderUsername, recipient: recipientUsername, message: message};

        onMessage(data)

        return
    }

    firebaseService.sendFirebaseMessage(recipientFirebaseToken, message, senderUsername, chatId)
}

module.exports = {sendMessage, getMessages}