import mongoose from 'mongoose';
import AccountsManager from './AccountsManager';
import { Account } from './models/Account';
import { Mail } from './models/Mail'; // Adjust the path as necessary
import { v4 as uuidv4 } from 'uuid';

class MailManager {
    /**
     * 
     * @param accountFrom Account schema object (ObjectID) of the sender (`null` if system-generated)
     * @param accountTo Account schema object (ObjectID) of the recipient
     * @param subject string
     * @param message string
     * @returns 
     */
    static async sendNewMail(accountFrom: any, accountTo: any, subject: string, message: string) {
        const newMail = new Mail({
            accountFrom,
            accountTo,
            timeSent: new Date(),
            subject,
            message
        });
        await newMail.save();
        return newMail;
    }

    static async findMailByAccountTo(accountTo: any) {
        return await Mail.find({ accountTo });
    }
}

export default MailManager;