//DB Connection
const { config } = require('dotenv');
const mongoose = require('mongoose');
require('dotenv').config();

//DB CONNECTION, ADDED STATIC DB URI
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://chileanseabass4:LrQtaxSToLrGK0D4@crud.csbpv8p.mongodb.net/?retryWrites=true&w=majority&appName=CRUD', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error:', error.message);
    }
};

module.exports = connectDB;
