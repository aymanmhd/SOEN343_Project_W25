const mongoose = require('mongoose');

const user = new mongoose.Schema({

    name : {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    streakCount : {
        type: Number,
        required: true,
        default: 0
    },
    lastLogin : {
        type: Date,
        required: true,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema, "users");
module.exports = User;