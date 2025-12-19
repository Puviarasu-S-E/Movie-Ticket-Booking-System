const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  row: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Silver', 'Gold', 'Platinum'],
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const screenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  seats: [seatSchema]
});

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  screens: [screenSchema],
  facilities: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Theatre', theatreSchema);