const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('LearningPath', learningPathSchema);