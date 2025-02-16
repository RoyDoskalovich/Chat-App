const User = require('../models/user.js').User
const UserProfile = require('../models/user.js').UserProfile

const createUser = async (username, password, displayName, profilePic) => {
    const existingUser = await User.findOne({username});
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const user = new User({
        username, password, displayName, profilePic
    })
    await user.save();

    const userProfile = new UserProfile({
        username, displayName, profilePic
    })
    await userProfile.save()
    return userProfile
}

const getUserDetails = async (username) => {
    const existingUser = await User.findOne({username});
    if (existingUser) {
        return existingUser
    }
    throw new Error('Failed to fetch details');
}

const getUserProfile = async (username) => {
    const userProfile = await UserProfile.findOne({username})
    if (!userProfile) {
        throw new Error('Failed to fetch userProfile');
    }

    return userProfile
}

module.exports = {createUser, getUserDetails, getUserProfile}