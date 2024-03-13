const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('LearningPath', learningPathSchema);
