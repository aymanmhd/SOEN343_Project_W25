import mongoose, { Schema, model } from 'mongoose';
import { Account } from './Account';

interface IEvent {
    name: string;
    date: Date;
    location: string;
    price: number;
    description: string;
    speakers: Array<Schema.Types.ObjectId>;
    attendees: Array<Schema.Types.ObjectId>;
    venue: string;
    time:  Date;

}

const EventSchema: Schema = new Schema<IEvent>({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    speakers: { type: [{ type: Schema.Types.ObjectId }], ref: 'Account', required: true },
    attendees: { type: [{ type: Schema.Types.ObjectId }], ref: 'Account', required: true },
    venue: { type: String, required: true },

});

const Event = model<IEvent>('Event', EventSchema);

export { Event, EventSchema, IEvent };