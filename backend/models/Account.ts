import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { Event } from './Event';
import { Order } from './Order';
import { Mail } from './Mail';

interface IAccount {
    email: string;
    password: string;
    role: string;
    fullName: string;
    cartItems: Array<Schema.Types.ObjectId>;
    orders: Array<Schema.Types.ObjectId>;
    mails: Array<Schema.Types.ObjectId>;
    attendingEvents: Array<Schema.Types.ObjectId>;
    hostedEvents: Array<Schema.Types.ObjectId>;
    lastLogin: Date;
    loginStreak: number;
    loginStreakRecord: number;
    loginStreakStartDate: Date;
    loginStreakLastDate: Date;
}

const AccountSchema = new Schema<IAccount>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    fullName: { type: String, required: true},

    cartItems: { type: [{ type: Schema.Types.ObjectId }], ref: 'Event', default: [] },
    orders: { type: [{ type: Schema.Types.ObjectId }], ref: 'Order', default: [] },
    
    mails: { type: [{ type: Schema.Types.ObjectId }], ref: 'Mail', default: [] },
    attendingEvents: { type: [{ type: Schema.Types.ObjectId }], ref: 'Event', default: [] },
    hostedEvents: { type: [{ type: Schema.Types.ObjectId }], ref: 'Event', default: [] },

    lastLogin: { type: Date, default: Date.now },
    loginStreak : { type: Number, default: 1 },
    loginStreakRecord : { type: Number, default: 1 },
    loginStreakStartDate : { type: Date, default: Date.now },
    loginStreakLastDate : { type: Date, default: Date.now },
});

const Account = model<IAccount>('Account', AccountSchema);

export { Account, AccountSchema, IAccount };