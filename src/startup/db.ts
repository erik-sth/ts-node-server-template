import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from '../utils/logger';

const connectToDatabase = async () => {
    let mongod: MongoMemoryServer;
    try {
        let mongoURI: string;

        if (process.env.NODE_ENV === 'test') {
            // Use an in-memory MongoDB server for testing
            const mongod = new MongoMemoryServer();
            await mongod.start();
            mongoURI = mongod.getUri();
        } else {
            // Use the provided MongoDB URI for other environments
            mongoURI =
                process.env.MONGODB_URI || 'mongodb://localhost:27017/template';
        }

        await mongoose.connect(mongoURI);
        logger.info('Connected to the database');
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error.message);
        throw error;
    } finally {
        if (mongod) {
            await mongod.stop();
        }
    }
};

export default connectToDatabase;
