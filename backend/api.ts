import path from "path";
import http from "http";
import https from "https";
import cors from "cors";
import express, { Request } from "express";

// Extend the Request interface to include the userId property fomr the cookieJwtAuth middleware
declare global {
    namespace Express {
        interface Request {
            account: Model<IAccount>;
        }
    }
}
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cookieJwtAuth from "./cookieJwtAuth";
import * as database from "./database";
import { AccountsManager, AccountRole } from "./AccountsManager";
import EventsManager from "./EventsManager";
import TransactionsManager from "./TransactionsManager";


import MailManager from "./MailManager";
import LoginStreak from "./LoginStreak";
import recommendation from "./recommendation";


import mongoose, { Model, Schema } from "mongoose";
import { Account, AccountSchema, IAccount } from "./models/Account";
import { Event, EventSchema, IEvent } from "./models/Event";
import { Mail, MailSchema } from "./models/Mail";
import { Order, OrderSchema } from "./models/Order";
// const Account = require("./models/Account");
// const Event = require("./models/Event");
// const Mail = require("./models/Mail");
// const Order = require("./models/Order");

dotenv.config();

mongoose.model('Account', AccountSchema);
mongoose.model('Event', EventSchema);
mongoose.model('Mail', MailSchema);
mongoose.model('Order', OrderSchema);

const apiServer = express();
const port = 8888;
const websiteUrl = "http://localhost:3000";

setTimeout(async () => {
    database.dropDatabase();
    const account2_create = await AccountsManager.register("admin2", "password", AccountRole.Admin, "Admin User");
    // console.log(account2_create);
    const account2_find = await AccountsManager.findAccountByEmail("admin2");
    if (!account2_find) {
        throw new Error("Account not found");
    }
    // console.log(account2_find);
    await TransactionsManager.clearCart(account2_find);
    // console.log(account2_find);

    const event1 = await EventsManager.createNewEvent("Sample Event", new Date(), "Sample Location", 50.00, "This is a sample event description.");
    const event2 = await EventsManager.createNewEvent("Sample Event", new Date(), "Sample Location", 100.00, "This is a sample event description.");

    await TransactionsManager.addToCart(account2_find, event1);
    await TransactionsManager.addToCart(account2_find, event2);
    // console.log(account2_find);
    // await TransactionsManager.removeFromCart(account2_find, event1);
    // console.log(account2_find);
    const cart1 = await TransactionsManager.getCart(account2_find);
    // console.log(cart1);

    await TransactionsManager.checkoutCart(account2_find, "1234567890123456");

    if (account2_find && account2_find.attendingEvents && (account2_find.attendingEvents as unknown as unknown[]).length > 0) {
        if (Array.isArray(account2_find.attendingEvents) && account2_find.attendingEvents.length > 0) {
            console.log(await Event.findById(account2_find.attendingEvents[0]));
        } else {
            console.log("No attending events found.");
        }
    } else {
        console.log("No attending events found.");
    }

    await TransactionsManager.addToCart(account2_find, event1);
    await TransactionsManager.addToCart(account2_find, event2);

    // add speaker
    const speaker1 = await AccountsManager.register("speaker1", "password", AccountRole.Admin, "Speaker 1");
    // add speaker to event
    await EventsManager.addSpeaker(event1, speaker1);

    const mail1 = await MailManager.sendNewMail(account2_find, account2_find, "Test Mail", "This is a test mail.");
    const mails1 = await MailManager.findMailByAccountTo(account2_find);
    console.log(mails1);
}, 2000);

var corsOptions = {
    origin: websiteUrl,
    credentials: true,
    optionsSuccessStatus: 200
};
apiServer.use(cors(corsOptions));
apiServer.use(express.urlencoded({ extended: true }));
apiServer.use(express.json());

// app.use(fileUpload());
  
apiServer.use(function (req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});

apiServer.use(cookieParser());

apiServer.get("/", (req, res) => {
    res.send("OK");
});

/* ================================================== */
/* Authentication, Login, and Registration            */
/* ================================================== */

apiServer.post("/login", async (req, res) => {
    const {email, password} = req.body;
    
    let account;
    try {
        account = await AccountsManager.login(email, password);
    } catch (e: any) {
        console.error("Error: ", e);
        return res.status(401).redirect(websiteUrl + "/login.html?error-msg=" + e.message);
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const jwtToken = jwt.sign({userId: account._id}, process.env.JWT_SECRET, {expiresIn: "10m"});

    res.cookie("token", jwtToken, {
        httpOnly: true,
        // sameSite: 'None',  // need to set Secure too?
    });

    LoginStreak.updateLoginStreak(account);  // Update login streak asynchronously

    // res.status(200).send("Logged In!");
    console.log("Successfully logged in!");
    return res.redirect(websiteUrl + "/account");
});

apiServer.post("/register", async (req, res) => {
    const {email, password, role, fullName} = req.body;
    try {
        const account = await AccountsManager.register(email, password, role, fullName);
        res.json(account);
        // return res.redirect(websiteUrl + "/login.html?success-msg=Successfully registered! Please log in...");
    } catch (e: any) {
        console.error("Error: ", e);
        res.status(400).json({ error: e.message });
        // return res.status(401).redirect(websiteUrl + "/register.html?error-msg=" + e.message);
    }
});

apiServer.get("/logout", async (req, res) => {
    res.clearCookie("token");
    return res.redirect(websiteUrl + "/login.html?success-msg=Successfully logged out");
});

apiServer.get("/check_login", cookieJwtAuth, (req, res) => {
    res.send(true);  // will throw an error if not logged in
});


apiServer.get('/account', cookieJwtAuth, async (req, res) => {
    try {
        let populated  = await req.account.populate('cartItems', []);  // equivalent to `GET /cart`
        populated = await populated.populate('orders');
        populated = await populated.populate(
            {
                path: 'mails',
                populate: [
                    { path: 'accountTo', select: 'email' },
                    { path: 'accountFrom', select: 'email' }
                ]
            }
        );  // equivalent to `GET /mail`
        populated = await populated?.populate('attendingEvents', []);
        populated = await populated?.populate('hostedEvents', []);

        res.json(populated);
    } catch (error) {
        console.error('Failed to fetch accounts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


/* ================================================== */
/* Events Endpoints                                   */
/* ================================================== */

apiServer.post("/events", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    const { name, date, location, price, description } = req.body;
    try {
        const event: IEvent = await EventsManager.createNewEvent(name, new Date(date), location, price, description);
        res.status(201).json(event);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Failed to create event" });
    }
});

apiServer.get("/events", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    try {
        let events = await EventsManager.getAllEvents();
        // for each speaker (ObjectId) in event, populate email and fullname 
        events = await Promise.all(events.map(async event => await event.populate({
            path: 'speakers',
            select: 'email fullName'
        })));
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

apiServer.post("/events/add_speaker", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    const { eventId, speakerId } = req.body;
    try {
        const updatedEvent = await EventsManager.addSpeaker(eventId, speakerId);
        res.json(updatedEvent);
    } catch (error) {
        console.error("Error adding speaker:", error);
        res.status(500).json({ error: "Failed to add speaker" });
    }
});

apiServer.post("/events/add_attendee_manually", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    const { eventId, attendeeId } = req.body;
    try {
        const updatedEvent = await EventsManager.addAttendee(eventId, attendeeId);
        res.json(updatedEvent);
    } catch (error) {
        console.error("Error adding attendee:", error);
        res.status(500).json({ error: "Failed to add attendee" });
    }
});

/* ================================================== */
/* Transactions Endpoints                             */
/* ================================================== */

apiServer.post("/cart/add", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    const { eventId } = req.body;
    try {
        // const account = await AccountsManager.findAccountByEmail("admin2");  // TODO: Replace with logged-in user
        const event = await Event.findById(eventId);
        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        try {
            const updatedCart = await TransactionsManager.addToCart(account, event);
            res.json(updatedCart);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
            return;
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add to cart" });
    }
});

apiServer.post("/cart/remove", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    const { eventId } = req.body;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        await TransactionsManager.removeFromCart(account, event);
        res.redirect('/cart');
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
});

apiServer.post("/cart/clear", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    try {
        const updatedCart = await TransactionsManager.clearCart(account);
        res.redirect('/cart');
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ error: "Failed to clear cart" });
    }
});

apiServer.get("/cart", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    try {
        if (!account) {
            res.status(404).json({ error: "Account not found" });
            return;
        }
        let populated = await account.populate('cartItems', []);
        res.json(populated.cartItems);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
});

apiServer.post("/cart/checkout", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    const { paymentCard } = req.body;
    try {
        const order = await TransactionsManager.checkoutCart(account, paymentCard);
        res.json(order);
    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ error: "Failed to checkout" });
    }
});

/* ================================================== */
/* Mail Endpoints                                     */
/* ================================================== */

apiServer.get("/mail", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    try {
        const mails = await MailManager.findMailByAccountTo(account);
        // populate accountFrom and accountTo fields with email and fullName
        await Mail.populate(mails, {
            path: 'accountFrom accountTo',
            select: 'email fullName'
        });
        res.json(mails);
    } catch (error) {
        console.error("Error fetching mail:", error);
        res.status(500).json({ error: "Failed to fetch mail" });
    }
});

apiServer.post("/mail", cookieJwtAuth, async (req, res) => {
    const account = req.account;
    const { accountTo, subject, message } = req.body;
    try {
        const accountToObj = await AccountsManager.findAccountByEmail(accountTo);
        if (!accountToObj) {
            res.status(404).json({ error: "Recipient account not found" });
            return;
        }
        const mail = await MailManager.sendNewMail(account, accountToObj, subject, message);
        await Mail.populate(mail, {
            path: 'accountFrom accountTo',
            select: 'email fullName'
        });
        res.json(mail);
    } catch (error) {
        console.error("Error sending mail:", error);
        res.status(500).json({ error: "Failed to send mail" });
    }
});


apiServer.use('/api', recommendation);


const httpServer = http.createServer(apiServer);
httpServer.listen(port);
console.log(`Listening on port ${port}`);

database.connectDatabase();
