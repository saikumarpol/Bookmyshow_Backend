const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  showTime: Date,
  availableSeats: [String],
  lockedSeats: [
    {
      seat: String,
      lockExpiresAt: Date
    }
  ],
  version: { type: Number, default: 0 }
});

module.exports = mongoose.model('Show', showSchema);
