import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { Event } from './Event';
import { Order } from './Order';
import { Mail } from './Mail';

const AccountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    fullName: { type: String, required: true},

    cartItems: { type: Array<Schema.Types.ObjectId>, ref: 'Event', default: [] },
    orders: { type: Array<Schema.Types.ObjectId>, ref: 'Order', default: [] },
    
    mails: { type: Array<Schema.Types.ObjectId>, ref: 'Mail', default: [] },
    attendingEvents: { type: Array<Schema.Types.ObjectId>, ref: 'Event', default: [] },
    hostedEvents: { type: Array<Schema.Types.ObjectId>, ref: 'Event', default: [] },

    lastLogin: { type: Date, default: Date.now },
    loginStreak : { type: Number, default: 1 },
    loginStreakRecord : { type: Number, default: 1 },
    loginStreakStartDate : { type: Date, default: Date.now },
    loginStreakLastDate : { type: Date, default: Date.now },
});

// AccountSchema.methods.changePassword = async function (oldPassword: string, newPassword: string) {
//     const isPasswordValid = await bcrypt.compare(oldPassword, this.password);
//     if (!isPasswordValid) {
//         throw new Error('Invalid password');
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     this.password = hashedPassword;
//     await this.save();
// };

// AccountSchema.methods.changeFullName = async function (fullName: string) {
//     this.fullName = fullName;
//     await this.save();
// };

// AccountSchema.methods.changeIsAdmin = async function (isAdmin: boolean) {
//     this.isAdmin = isAdmin;
//     await this.save();
// };

const Account = mongoose.model('Account', AccountSchema);

export { Account, AccountSchema };