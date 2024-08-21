const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  make: { type: String, required: true }, // Make of the car
  model: { type: String, required: true }, // Model of the car
  year: { type: Number, required: true }, // Year of the car
  // licenceNumber: { type: String, required: true, unique: true }, // Unique licence plate number
  registrationNumber: { type: String, required: true, unique: true }, // Unique registration number
  rentRate: { type: Number, required: true }, // Daily/hourly rental rate
  availableTablesByTimeSlot: [
    {
      timeSlot: String,
      available: Number,
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
