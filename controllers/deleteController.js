const Booking = require('../models/Booking');
const DeletedBooking = require('../models/DeletedBooking');

// Controller method to handle deletion request
exports.requestDelete = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Find bookings for the given phone number
    const bookings = await Booking.find({ 'customer.phoneNumber': phoneNumber });
    if (bookings.length === 0) {
      return res.send('No bookings found for this phone number.');
    }

    // Create a deletion request for each booking
    for (const booking of bookings) {
      const deletedBooking = new DeletedBooking({
        originalBookingId: booking._id,
        car: booking.car,
        customer: booking.customer,
        bookingDate: booking.bookingDate,
        timeSlot: booking.timeSlot
      });
      await deletedBooking.save();
    }

    res.send('Deletion request has been recorded.');
  } catch (error) {
    console.error('Error requesting deletion:', error);
    res.status(500).send('Internal server error');
  }
};
