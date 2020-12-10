const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require: true,
    default: ''
  },
  text: {
    type: String,
    trim: true,
    require: true,
    default: ''
  }
})

module.exports = mongoose.model('Faq', faqSchema);