const userService = require('../services/user.js')

const createUser = async (req, res) => {
    try {
        res.json(await userService.createUser(
            req.body.username,
            req.body.password,
            req.body.displayName,
            req.body.profilePic
        ))
    } catch (error) {
        if (error.message === 'Username already exists') {
            res.status(409).json({error: 'Username already exists'});
        }
    }
}

const getUserDetails = async (req, res) => {
    try {
        // Extract the id from the request parameters
        const {id} = req.params;

        // Query the user with the provided id
        const user = await userService.getUserDetails(id)
        // Check if the user exists
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        // Return the user's profilePic and displayName
        res.status(200).json({
            username: user.username,
            displayName: user.displayName,
            profilePic: user.profilePic
        });
    } catch (error) {
        if (error.message === 'Failed to fetch details') {
            res.status(401).json({error: 'Failed to fetch details'});
        }
    }
}


module.exports = {createUser, getUserDetails}