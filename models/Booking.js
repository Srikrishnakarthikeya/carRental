const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  car: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
  },
  customer: {
    phoneNumber: { type: String, required: true },
    gmail:{ type: String, required: true},
    // name: { type: String, required: true },
    // id: { type: String, required: true },
  },
  bookingDate: { type: Date, default: Date.now },
  timeSlot: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;




// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   car: {
//     make: { type: String, required: true }, // Make of the car
//     model: { type: String, required: true }, // Model of the car
//     year: { type: Number, required: true }, // Year of the car
//     // Note: licenceNumber and rentRate have been removed
//   },
//   timeSlot: { type: String, required: true }, // Time slot for booking
//   phoneNumber: { type: String, required: true }, // Phone number of the customer
//   customerName: { type: String, required: true }, // Name of the customer
//   customerId: { type: String, required: true }, // Id of customer the car is rented to
//   bookingDate: { type: Date, default: Date.now }, // Date when the booking was made
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// module.exports = Booking;
