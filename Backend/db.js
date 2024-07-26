const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./utils/logger');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('Failed to connect to MongoDB', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
