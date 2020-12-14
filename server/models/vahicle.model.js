const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  plate: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    uppercase: true,
  },
  type_of_vehicle: {
    type: String,
    trim: true,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    trim: true,
    required: true
  },
  color: String,
  vehicle_image_front: String,
  vehicle_image_left: String,
  latitude: String,
  longitude: String,
  average_speed: {
    type: Array,
    default: []
  },
  speed: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: false
  },
  activation: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

module.exports = mongoose.model('Vehicle', vehicleSchema);