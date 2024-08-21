const mongoose = require('mongoose');

const carRatingSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  avg_rating: { type: Number, default: 0 },
  no_of_ratings: { type: Number, default: 0 }
});

const CarRating = mongoose.model('CarRating', carRatingSchema);

module.exports = CarRating;
