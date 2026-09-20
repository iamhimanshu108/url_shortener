import dotenv from 'dotenv';
dotenv.config();

const config = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
}

export default config;