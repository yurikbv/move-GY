const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    unique: true
  }
})

module.exports = mongoose.model('City', citySchema);