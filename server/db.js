const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mydb');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  } 
}

module.exports = connectToDB;