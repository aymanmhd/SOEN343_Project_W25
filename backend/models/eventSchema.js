const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    eventID : {
        type: Number,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    description: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema, "events");
module.exports = Event;