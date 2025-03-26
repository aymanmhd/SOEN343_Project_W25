import path from "path";
import http from "http";
import https from "https";
import cors from "cors";
import express, { Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cookieJwtAuth from "./cookieJwtAuth";
import * as database from "./database";
import AccountsManager from "./AccountsManager";
import EventsManager from "./EventsManager";
import TransactionsManager from "./TransactionsManager";

import { Event } from "./models/Event";
import MailManager from "./MailManager";

dotenv.config();

const apiServer = express();
const port = 3000;
const websiteUrl = "http://localhost";

setTimeout(async () => {
    database.dropDatabase();
    const account2_create = await AccountsManager.register("admin2", "password", "Admin", "Admin User");
    // console.log(account2_create);
    const account2_find = await AccountsManager.findAccountByUsername("admin2");
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

    const mails1 = await MailManager.findMailByAccountTo(account2_find);
    console.log(mails1);
}, 2000);

var corsOptions = {
    origin: "",
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
    const {username, password} = req.body;
    
    let account;
    try {
        account = await AccountsManager.login(username, password);
    } catch (e: any) {
        console.error("Error: ", e);
        return res.status(401).redirect(websiteUrl + "/login.html?error-msg=" + e.message);
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const jwtToken = jwt.sign({username: account.username}, process.env.JWT_SECRET, {expiresIn: "10m"});

    res.cookie("token", jwtToken, {
        httpOnly: true,
        // sameSite: 'None',  // need to set Secure too...
    });

    // res.status(200).send("Logged In!");
    return res.redirect(websiteUrl + "/account.html");
});

apiServer.post("/register", async (req, res) => {
    const {username, password, isAdmin, fullName} = req.body;
    try {
        const account = await AccountsManager.register(username, password, isAdmin, fullName);
        return res.redirect(websiteUrl + "/login.html?success-msg=Successfully registered! Please log in...");
    } catch (e: any) {
        console.error("Error: ", e);
        return res.status(401).redirect(websiteUrl + "/register.html?error-msg=" + e.message);
    }
});

apiServer.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.redirect(websiteUrl + "/login.html?success-msg=Successfully logged out");
});

apiServer.get("/check_login", cookieJwtAuth, (req, res) => {
    res.send(true);
});




const httpServer = http.createServer(apiServer);
// const httpsServer = https.createServer(credentials, app);

httpServer.listen(port);
// httpsServer.listen(port);

console.log(`Listening on port ${port}`);

database.connectDatabase();
