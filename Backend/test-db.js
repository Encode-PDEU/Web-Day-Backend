const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./Models/questionModel'); // Adjust the path if necessary

const testDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    const count = await Question.countDocuments();
    console.log('Total questions count:', count);
    if (count > 0) {
      const random = Math.floor(Math.random() * count);
      const question = await Question.findOne().skip(random);
      console.log('Random question:', question);
    } else {
      console.log('No questions found');
    }
    mongoose.connection.close();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

testDB();
