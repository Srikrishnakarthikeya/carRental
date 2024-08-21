const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const CarRating = require('../models/carRating'); // Import the CarRating model
// Route to display rating form
router.get('/submit-rating', (req, res) => {
  res.render('submitRating');
});

// Route to handle rating submission
router.post('/submit-rating', ratingController.submitRating);

// Route to display all ratings
router.get('/ratings', async (req, res) => {
  try {
    const carRatings = await CarRating.find();
    res.render('ratings', { carRatings });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).send('Error fetching ratings');
  }
});

module.exports = router;
