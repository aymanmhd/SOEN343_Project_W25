import mongoose, { Schema } from 'mongoose';
import { Event } from './Event';
import { Account } from './Account';

const OrderSchema: mongoose.Schema = new mongoose.Schema({
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    date: { type: Date, required: true },
    paymentCard: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    items: { type: Array<Schema.Types.ObjectId>, ref: 'Event', required: true },
    // items: { type: Array<typeof Event>, required: true },
});

const Order = mongoose.model('Order', OrderSchema);

export { Order, OrderSchema };