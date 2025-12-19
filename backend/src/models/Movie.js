const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: [{
    type: String,
    required: true
  }],
  language: [{
    type: String,
    required: true
  }],
  duration: {
    type: Number,
    required: true // in minutes
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  poster: {
    type: String,
    required: true
  },
  backdrop: {
    type: String
  },
  trailer: {
    type: String // YouTube URL
  },
  cast: [{
    name: String,
    character: String,
    image: String
  }],
  crew: [{
    name: String,
    role: String
  }],
  releaseDate: {
    type: Date,
    required: true
  },
  format: [{
    type: String,
    enum: ['2D', '3D', 'IMAX'],
    default: '2D'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);