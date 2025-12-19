const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theatre',
    required: true
  },
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  format: {
    type: String,
    enum: ['2D', '3D', 'IMAX'],
    required: true
  },
  language: {
    type: String,
    required: true
  },
  pricing: {
    Silver: {
      type: Number,
      required: true
    },
    Gold: {
      type: Number,
      required: true
    },
    Platinum: {
      type: Number,
      required: true
    }
  },
  bookedSeats: [{
    row: String,
    number: Number
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Show', showSchema);