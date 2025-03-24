import { Mail } from './models/Mail'; // Adjust the path as necessary
import { v4 as uuidv4 } from 'uuid';

class MailManager {
    static async sendNewMail(accountTo: string, accountFrom: string, subject: string, message: string) {
        const newMail = new Mail({
            accountTo,
            accountFrom,
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