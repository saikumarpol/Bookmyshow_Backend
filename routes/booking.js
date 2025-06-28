const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Show = require('../models/Show');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// BOOK SEATS (without OTP)
router.post('/book', authMiddleware, async (req, res) => {
  const { showId, seats } = req.body;
  const userId = req.user.id;

  try {
    const show = await Show.findById(showId);
    if (!show) return res.status(404).json({ message: 'Show not found' });

    const now = new Date();

    // Filter valid locked seats (not expired)
    const validLockedSeats = show.lockedSeats.filter(lock => lock.lockExpiresAt > now);
    const lockedSeatNumbers = validLockedSeats.map(lock => lock.seat);

    // Check if requested seats are either unavailable or already locked
    const unavailableSeats = seats.filter(seat =>
      !show.availableSeats.includes(seat) ||
      lockedSeatNumbers.includes(seat)
    );

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: `Seats ${unavailableSeats.join(', ')} are unavailable`,
        debug: {
          availableSeats: show.availableSeats,
          lockedSeats: lockedSeatNumbers
        }
      });
    }

    // Lock seats with expiry (5 minutes)
    const lockExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
    const newLockedSeats = seats.map(seat => ({ seat, lockExpiresAt }));

    const updatedShow = await Show.findOneAndUpdate(
      { _id: showId, version: show.version },
      {
        $set: { lockedSeats: [...validLockedSeats, ...newLockedSeats] },
        $inc: { version: 1 }
      },
      { new: true }
    );

    if (!updatedShow) {
      return res.status(409).json({ message: 'Seat lock failed due to concurrent booking' });
    }

    const booking = new Booking({
      user: userId,
      show: showId,
      seats,
      status: 'confirmed' // Direct confirmation since OTP is skipped
    });
    await booking.save();

    res.status(200).json({ bookingId: booking._id, message: 'Booking confirmed successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error during booking' });
  }
});

// BOOKING HISTORY
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({
        path: 'show',
        populate: [
          { path: 'movie' },
          { path: 'venue' }
        ]
      })
      .lean();

    res.json(bookings);
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ message: 'Server error while fetching booking history' });
  }
});

module.exports = router;
