const mongoose = require('mongoose');

const masterclassSchema = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('Masterclass', masterclassSchema);