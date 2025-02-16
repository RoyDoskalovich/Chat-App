const {json} = require("express");
const User = require("../models/user.js").User
const UserProfile = require("../models/user.js").UserProfile
const Chat = require("../models/chat.js")
const mongoose = require("mongoose");

const createChat = async (newContact, myUser) => {
    if (newContact === myUser) {
        throw new Error('your a lonely guy');
    }

    const newContactDetails = await UserProfile.findOne({username: newContact})
    const myUserDetails = await UserProfile.findOne({username: myUser})
    if (!(newContactDetails && myUserDetails)) {
        throw new Error('User not found');
    }

    const users = [newContactDetails, myUserDetails]

    const chat = await Chat.findOne({
        $and: [
            {users: newContactDetails._id},
            {users: myUserDetails._id},
        ]
    });

    if (chat) {
        const currentUser = await User.findOne({username: myUser}).populate('chats').exec()

        const chatExistForMe = currentUser.chats.find(userChat => userChat._id.toString() === chat._id.toString())
        if (!chatExistForMe) {
            console.log(chat)
            currentUser.chats.push(chat)
            await currentUser.save()

            // Lines 37-44 are for adding the same chat to the second user in the same time.
            // Check if newContactDetails also has the chat
            const otherUser = await User.findOne({username: newContact}).populate('chats').exec();
            const chatExistForOtherUser = otherUser.chats.find(userChat => userChat._id.toString() === chat._id.toString());

            if (!chatExistForOtherUser) {
                otherUser.chats.push(chat);
                console.log("got here")
                await otherUser.save();
            }

            return {id: chat._id, user: newContactDetails}
        }
        console.log("chat already exists")

        throw new Error('Chat already exist');
    }

    const newChat = new Chat({
        users: users,
        lastMessage: {
            id: null,
            created: null,
            content: null
        }
    })
    await newChat.save()

    const currentUser = await User.findOne({username: myUser}).populate('chats').exec()
    currentUser.chats.push(newChat)
    await currentUser.save()

    return {id: newChat._id, user: newContactDetails}
}


const getChat = async (chatId, username) => {
    const user = await User.findOne({username});
    if (!user) {
        throw new Error('User not found');
    }
    const existingChat = user.chats.find(chat => chat.id === chatId);
    if (existingChat) {
        return existingChat
    }
    throw new Error('Failed to fetch details');
}


const deleteChat = async (chatId, username) => {
    const user = await User.findOne({username});
    if (!user) {
        throw new Error('User not found');
    }
    const chatIndex = user.chats.findIndex((chat) => chat.id === chatId);
    if (chatIndex !== -1) {
        // Remove the chat from the user's chats array
        user.chats.splice(chatIndex, 1);
        await user.save();

        // Delete the chat from the database
        await Chat.findByIdAndDelete(chatId);

        return;
    }
    throw new Error('Failed to fetch details');
}

const getChats = async (username) => {
    const myUser = await User.findOne({username})
        .populate({
            path: 'chats',
            populate: {
                path: 'users',
                model: 'UserProfile',
                select: 'username displayName profilePic',
            },
        }).exec();

    if (myUser) {
        const myUserProfile = await UserProfile.findOne({username})
        const myUserProfileId = myUserProfile._id

        const formattedChats = myUser.chats.map(chat => {
            const otherUser = chat.users.find(u => u._id.toString() !== myUserProfileId.toString())

            return {
                id: chat._id,
                user: {
                    username: otherUser.username,
                    displayName: otherUser.displayName,
                    profilePic: otherUser.profilePic
                },
                lastMessage: {
                    id: chat.lastMessage.id,
                    created: chat.lastMessage.created,
                    content: chat.lastMessage.content
                }
            };
        });

        return formattedChats;
    }

    throw new Error('Failed to fetch details');
};

module.exports = {createChat, getChat, getChats, deleteChat}

