import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Account, IAccount } from "./models/Account";
import { Model } from "mongoose";

interface CustomRequest extends Request {
    account: Model<IAccount>;
}

const cookieJwtAuth: RequestHandler = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.token;
    try {
        if (!process.env.JWT_SECRET) {
            res.status(500).send("JWT_SECRET is not defined");
            return;
        }
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof tokenData !== 'string' && 'userId' in tokenData) {
            // req.userId = tokenData.userId;

            const account = await Account.findById<Model<IAccount>>(tokenData.userId);
            if (!account) {
                res.status(404).json({ error: 'Account not found' });
                return;
            }
            req.account = account;
        } else {
            res.status(401).send("Invalid token data");
            return;
        }
        next();
    } catch (e) {
        res.clearCookie("token");
        res.status(401).send("Invalid token");
    }
};

export default cookieJwtAuth;