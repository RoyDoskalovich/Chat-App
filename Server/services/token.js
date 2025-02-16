const User = require("../models/user").User


const createToken = async (username, password) => {
    const existingUser = await User.findOne({username, password});
    if (!existingUser) {
        throw new Error('User doesnt exist');
    }
}

const setFirebaseToken = async (username, firebaseToken) => {
    const existingUser = await User.findOne({username})
    if (!existingUser) {
        throw new Error('User doesnt exist')
    }

    existingUser.firebaseToken = firebaseToken
    await existingUser.save()
}

module.exports = {createToken, setFirebaseToken}