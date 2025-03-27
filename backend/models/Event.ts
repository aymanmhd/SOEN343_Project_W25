import mongoose, { Schema } from 'mongoose';
import { Account } from './Account';

const EventSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    speakers: { type: Array<Schema.Types.ObjectId>, ref: 'Account', required: true },
    attendees: { type: Array<Schema.Types.ObjectId>, ref: 'Account', required: true },
    
});

const Event = mongoose.model('Event', EventSchema);

export { Event, EventSchema };