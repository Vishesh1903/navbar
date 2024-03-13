const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  instructor: String
});

module.exports = mongoose.model('Course', courseSchema);
