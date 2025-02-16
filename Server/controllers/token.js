const tokenService = require('../services/token.js')
const userService = require('../services/user.js')
const jwt = require("jsonwebtoken")
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

const createToken = async (req, res) => {
    try {
        // TODO: createToken is from tokenService and we better change the name because it doesn't reflect its functionality.
        await tokenService.createToken(
            req.body.username,
            req.body.password,
        )
        const userProfile = await userService.getUserProfile(req.body.username);

        const data = {
            username: req.body.username,
            userProfileId: userProfile._id,
        }
        const token = jwt.sign(data, key)
        res.status(200).send(token);
    } catch (error) {
        if (error.message === 'User doesnt exist') {
            res.status(404).json({error: 'User doesnt exist'});
        }
    }
}

const setFirebaseToken = async (req, res) => {
    try {
        const {username} = await getUserFromToken(req)
        await tokenService.setFirebaseToken(
            username,
            req.body.token,
        )
        res.status(200).send()
    } catch (err) {
        res.status(400).send()
    }
}

const isLoggedIn = (req, res, next) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the token is valid
            const data = jwt.verify(token, key);
            // Token validation was successful. Continue to the actual function (index)
            return next()
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    } else
        return res.status(403).send('Token required');
}

const getUserFromToken = async (req) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the token is valid
            return jwt.verify(token, key);
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    } else
        return res.status(403).send('Token required');
}

module.exports = {createToken, setFirebaseToken, isLoggedIn, getUserFromToken}