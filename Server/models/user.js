const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
    firebaseToken: {
        type: String,
        required: false,
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        default: []
    }]
});

const UserProfileSchema = new Schema({
    username: {
        type: String,
        nullable: true
    },
    displayName: {
        type: String,
        nullable: true
    },
    profilePic: {
        type: String,
        nullable: true
    },
})

const User = mongoose.model('User', UserSchema);
const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = {
    User,
    UserProfile
};