const mongoose = require('mongoose');

//UserSchema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true,
    default: ''
  },
  role: {
    type: String,
    required: true,
    default: 'User'
  },
  latitude:  {
    type: Number
  },
  longitude: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: false
  },
  mobileNumber: {
    type: String,
    default: ''
  },
  images: {
    type: Array,
    default: []
  },
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  activation: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);
