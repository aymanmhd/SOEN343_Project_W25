import mongoose, { Schema } from 'mongoose';

const EventSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    description: { type: String, required: true },
    speakers: { type: Array<Schema.Types.ObjectId>, ref: 'Account', required: true },
    attendees: { type: Array<Schema.Types.ObjectId>, ref: 'Account', required: true },
    
});

export const Event = mongoose.model('event', EventSchema);