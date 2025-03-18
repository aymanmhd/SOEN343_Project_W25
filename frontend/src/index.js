const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

async function connectToMongoDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

connectToMongoDB();