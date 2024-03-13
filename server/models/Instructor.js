const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Instructor', instructorSchema);
