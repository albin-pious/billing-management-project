import mongoose from 'mongoose';
import config from '../config/config.js';

const dbConnection = async()=>{
    try {
        await mongoose.connect(config.dbConnectionString);
        console.log('Mongodb connected successfully');

        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB disconnected! Attempting to reconnect...');
            dbConnection();
        })
    } catch (error) {
        console.error('MongoDB connection error: ', error);
        process.exit(1);
    }
}

export default dbConnection;