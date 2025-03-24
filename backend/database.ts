import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async () => {
    try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(mongoUri, {});
    console.info('Database connected');
    } catch (error) {
        console.error('Database connection error', error);
    }
};

// drop all dataabase
export const dropDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase();
        console.info('Database dropped');
    } catch (error) {
        console.error('Database drop error', error);
    }
};