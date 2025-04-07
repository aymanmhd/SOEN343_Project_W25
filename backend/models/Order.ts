import mongoose, { Schema, model } from 'mongoose';
import { Event } from './Event';
import { Account } from './Account';

interface IOrder {
    account: Schema.Types.ObjectId | null;
    date: Date;
    paymentCard: string;
    totalPrice: number;
    items: Array<Schema.Types.ObjectId>;
    // items: Array<typeof Event>;
}

const OrderSchema: Schema = new Schema<IOrder>({
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    date: { type: Date, required: true },
    paymentCard: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    items: { type: [{ type: Schema.Types.ObjectId }], ref: 'Event', required: true },
    // items: { type: Array<typeof Event>, required: true },
});

const Order = model<IOrder>('Order', OrderSchema);

export { Order, OrderSchema, IOrder };