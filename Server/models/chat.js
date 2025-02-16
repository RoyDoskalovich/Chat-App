const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Chat = new Schema({

    users: [{
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
        default: []
    }],
    lastMessage: {
        id: {
            type: Number,
        },
        created: {
            type: Date,
        },
        content: {
            type: String,
        },
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }]
});


module.exports = mongoose.model(`Chat`, Chat);
