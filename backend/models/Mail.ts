import mongoose, { Schema } from 'mongoose';

const MailSchema: mongoose.Schema = new mongoose.Schema({
    accountTo: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    accountFrom: { type: Schema.Types.ObjectId, ref: 'Account', required: false, default: null },
    timeSent: { type: Date, required: true },
    subject: { type: String, required: true },
    messsge: { type: String, required: true },
});

export const Mail = mongoose.model('mail', MailSchema);