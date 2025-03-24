import { Event } from './models/Event';
import { Account } from './models/Account';
import AccountsManager from './AccountsManager';
import { Order } from './models/Order';
import { v4 as uuidv4 } from 'uuid';
import { Mail } from './models/Mail';
import mongoose from 'mongoose';


class TransactionsManager {
    static async addToCart(account: any, event: any) {
        // check if event is already in cart
        const isEventInCart = account.cartItems.some((item: any) => item._id === event._id);
        if (isEventInCart) {
            throw new Error('Event is already in cart');
        }

        account.cartItems.push(event._id);
        await account.save();
    }

    static async removeFromCart(account: any, event: any) {
        account.cartItems = account.cartItems.filter((item: any) => item._id !== event._id);
        await account.save();
    }

    static async clearCart(account: any) {
        account.cartItems = [];
        await account.save();
    }

    static async checkoutCart(account: any, paymentCard: string) {
        // create order
        const order: any = new Order({
            account: account,
            date: new Date(),
            paymentCard: paymentCard,
            totalPrice: await account.cartItems.reduce(async (accPromise: Promise<number>, item: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }) => {
                const acc = await accPromise;
                const event: any = await Event.findById(item);
                return acc + event.ticketPrice;
            }, Promise.resolve(0)),
            items: account.cartItems,
        });
        await order.save();
        // add order to account
        account.orders.push(order._id);
        // clear cart
        account.cartItems = [];
        // send email
        const mail = new Mail({
            id: uuidv4(),
            accountTo: account,
            accountFrom: null,
            timeSent: new Date(),
            subject: 'Order Confirmation',
            messsge: `Thank you for your order. Your order ID is ${order.id}.`,
        });
        await mail.save();
        account.mails.push(mail._id);

        // for all events in order, add account to attendees
        for (const eventId of order.items) {
            const event = await Event.findById(eventId);
            if (!event) {
                throw new Error('Event not found');
            }
            const eventAttendees: any = event.attendees;
            eventAttendees.push(account._id);
            await event.save();
            account.attendingEvents.push(event._id);
        }

        await account.save();
        
    }

    static async getCart(account: any) {
        return account.cartItems;
    }
}

export default TransactionsManager;