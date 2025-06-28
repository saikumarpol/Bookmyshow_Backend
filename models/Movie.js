const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  city: { type: String, required: true },
  duration: { type: Number }, // in minutes
});

module.exports = mongoose.model('Movie', movieSchema);