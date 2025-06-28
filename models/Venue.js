const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  totalSeats: { type: Number, required: true },
});

module.exports = mongoose.model('Venue', venueSchema);