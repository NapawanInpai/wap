const mongoose = require('mongoose');
require('dotenv').config();

const db_url = process.env.MONGO_URI

exports.connectDB = async () => {
    try {
        const connectOptions = {
            dbName: 'webapp',
        };
        await mongoose.connect(db_url, connectOptions);
        console.log('Connected to database successfully');
    } catch (error) {
        console.log(`Error connecting to database: ${error.message}`);
    }
}