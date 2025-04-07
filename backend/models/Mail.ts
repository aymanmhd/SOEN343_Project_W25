import mongoose, { Schema, model } from 'mongoose';
import { Account } from './Account';

interface IMail {
    accountFrom: Schema.Types.ObjectId | null;
    accountTo: Schema.Types.ObjectId;
    timeSent: Date;
    subject: string;
    message: string;
}

const MailSchema: Schema = new Schema<IMail>({
    accountFrom: { type: Schema.Types.ObjectId, ref: 'Account', required: false, default: null },
    accountTo: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    timeSent: { type: Date, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

const Mail = model<IMail>('Mail', MailSchema);

export { Mail, MailSchema, IMail };