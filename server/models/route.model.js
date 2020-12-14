const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  city: {
    type: String,
    require: true,
    default: '',
    trim: true
  },
  name: {
    type:String,
    require: true,
    trim: true
  },
  number: {
    type: String,
    trim: true,
  },
  logo: String,
  stops: {
    type: Array,
    default: []
  },
  fare: String,
  average_travel_time: String,
  rush_hour: String,
  image_first_stop: String,
  image_last_stop: String,
  about: String,
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  activation: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Route', routeSchema);