const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Show = require('../models/Show');
const authMiddleware = require('../middleware/auth');

router.get('/search', authMiddleware, async (req, res) => {
  const { city } = req.query;
  try {
    const movies = await Movie.find({ city }).lean();
    const shows = await Show.find({ movie: { $in: movies.map(m => m._id) } })
      .populate('movie')
      .populate('venue')
      .lean();
    res.json({ movies, shows });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;