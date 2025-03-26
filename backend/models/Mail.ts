import mongoose, { Schema } from 'mongoose';
import { Account } from './Account';

const MailSchema: mongoose.Schema = new mongoose.Schema({
    accountFrom: { type: Schema.Types.ObjectId, ref: 'Account', required: false, default: null },
    accountTo: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    timeSent: { type: Date, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

const Mail = mongoose.model('Mail', MailSchema);

export { Mail, MailSchema };