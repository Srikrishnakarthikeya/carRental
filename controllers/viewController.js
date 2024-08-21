const CarRating = require('../models/carRating');

// Controller method to fetch and display ratings
exports.viewRatings = async (req, res) => {
  try {
    const carRatings = await CarRating.find({});
    res.render('rating', { carRatings });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.redirect('/error'); // Redirect or handle error appropriately
  }
};
