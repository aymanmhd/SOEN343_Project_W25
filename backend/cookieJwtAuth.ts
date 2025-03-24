import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

interface CustomRequest extends Request {
    username?: String;
}

const cookieJwtAuth: RequestHandler = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    try {
        if (!process.env.JWT_SECRET) {
            res.status(500).send("JWT_SECRET is not defined");
            return;
        }
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof tokenData !== 'string' && 'username' in tokenData) {
            req.username = tokenData.username;
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