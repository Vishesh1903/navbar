const mongoose = require('mongoose');
const LearningPath = require('./LearningPath');
const Course = require('./Course');
const Masterclass = require('./Masterclass');

const categorySchema = new mongoose.Schema({
  names: [String],
  description: String,
  learningPaths: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LearningPath' }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  masterclasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Masterclass' }]
});

module.exports = mongoose.model('Category', categorySchema);