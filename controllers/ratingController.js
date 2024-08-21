const CarRating = require('../models/carRating');

// Controller method to handle rating submission
exports.submitRating = async (req, res) => {
  try {
    const { make, model, year, rating } = req.body;

    // Validate rating
    if (rating < 0 || rating > 10) { // Example validation range
      return res.status(400).send('Invalid rating');
    }

    // Find the car rating document or create a new one
    const carRating = await CarRating.findOne({ make, model, year });

    if (carRating) {
      // Update the existing car rating
      carRating.no_of_ratings += 1;
      carRating.avg_rating = ((carRating.avg_rating * (carRating.no_of_ratings - 1)) + rating) / carRating.no_of_ratings;
      await carRating.save();
    } else {
      // Create a new car rating
      const newCarRating = new CarRating({
        make,
        model,
        year,
        avg_rating: rating,
        no_of_ratings: 1
      });
      await newCarRating.save();
    }

    res.redirect('/ratings'); // Redirect to the view ratings page
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.redirect('/submit-rating'); // Redirect to form in case of error
  }
};
