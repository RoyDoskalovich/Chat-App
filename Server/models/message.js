const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now(),
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
    },
    content: {
        type: String,
        nullable: true
    }
})


module.exports = mongoose.model(`Message`, MessageSchema);