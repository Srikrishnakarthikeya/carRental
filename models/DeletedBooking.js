const mongoose = require('mongoose');

const deletedBookingSchema = new mongoose.Schema({
  originalBookingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking', 
    required: true 
  },
  car: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
  },
  customer: {
    phoneNumber: { type: String, required: true },
    gmail: { type: String, required: true },
  },
  bookingDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  requestedAt: { type: Date, default: Date.now }, // Date when the deletion was requested
});

const DeletedBooking = mongoose.model('DeletedBooking', deletedBookingSchema);

module.exports = DeletedBooking;
