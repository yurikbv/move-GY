const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  event_alert: {
    type: String
  },
  is_active_alert: Boolean
})

module.exports = mongoose.model('Alert', alertSchema);