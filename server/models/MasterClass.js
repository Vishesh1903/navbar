const mongoose = require('mongoose');

const masterClassSchema = new mongoose.Schema({
  name: String,
  instructor: String
});

module.exports = mongoose.model('MasterClass', masterClassSchema);
