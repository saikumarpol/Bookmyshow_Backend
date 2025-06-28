const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Venue = require('../models/Venue');
const Show = require('../models/Show');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.post('/movies', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, genre, city, duration } = req.body;
  try {
    const movie = new Movie({ title, genre, city, duration });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/venues', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, city, totalSeats } = req.body;
  try {
    const venue = new Venue({ name, city, totalSeats });
    await venue.save();
    res.status(201).json(venue);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/shows', authMiddleware, adminMiddleware, async (req, res) => {
  const { movieId, venueId, showTime, availableSeats } = req.body;
  try {
    const show = new Show({ movie: movieId, venue: venueId, showTime, availableSeats, lockedSeats: [] });
    await show.save();
    res.status(201).json(show);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;