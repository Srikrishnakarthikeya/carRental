//hello This is my Project
const Booking = require('../models/Booking'); // Import Booking model
const { sendEmail } = require('../utils/email'); // Import email utility

const ADMIN_EMAIL = 'gskkarthikeya@gmail.com'; // Admin's email address

// Controller method to handle car booking
exports.bookCar = async (req, res) => {
  try {
    const { make, model, year, timeSlot, phoneNumber, gmail } = req.body;

    // Check if there is a booking with the same time slot
    const existingBooking = await Booking.findOne({
      'car.make': make,
      'car.model': model,
      'car.year': year,
      timeSlot
    });

    if (existingBooking) {
      // If a booking already exists for the same time slot, return an error
      return res.status(409).send('This car is already booked for the selected time slot.');
    }

    // Create a new booking
    const newBooking = new Booking({
      car: { make, model, year },
      customer: { phoneNumber, gmail },
      timeSlot
    });

    // Save the booking to the database
    await newBooking.save();
    
    // Send booking confirmation email to the user
    await sendEmail(
      gmail,
      'Booking Confirmation',
      `Your booking for ${make} ${model} (${year}) at ${timeSlot} has been confirmed.`
    );

    // Send booking notification email to the admin
    await sendEmail(
      ADMIN_EMAIL,
      'New Booking',
      `A new booking has been made for ${make} ${model} (${year}) at ${timeSlot}. Customer email: ${gmail}.`
    );

    // Redirect or render a confirmation page
    res.redirect('/customerpage'); 
  } catch (error) {
    console.error('Error processing booking:', error);
    res.redirect('/bookit'); // Redirect to form in case of error
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    console.log(bookings); // Debugging line
    res.render('bookings', { bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, year, timeSlot, phoneNumber, gmail } = req.body;

    await Booking.findByIdAndUpdate(id, {
      car: { make, model, year },
      customer: { phoneNumber, gmail },
      timeSlot
    });

    // Send booking update confirmation email to the user
    await sendEmail(
      gmail,
      'Booking Update Confirmation',
      `Your booking for ${make} ${model} (${year}) has been updated to ${timeSlot}.`
    );

    // Send booking update notification email to the admin
    await sendEmail(
      ADMIN_EMAIL,
      'Booking Update',
      `A booking has been updated for ${make} ${model} (${year}) to ${timeSlot}. Customer email: ${gmail}.`
    );

    res.redirect('/bookings'); // Redirect to the bookings page
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking to get the customer's email
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).send('Booking not found');
    }

    await Booking.findByIdAndDelete(id);

    // Send booking deletion confirmation email to the user
    await sendEmail(
      booking.customer.gmail,
      'Booking Deletion Confirmation',
      `Your booking for ${booking.car.make} ${booking.car.model} (${booking.car.year}) has been successfully deleted.`
    );

    // Send booking deletion notification email to the admin
    await sendEmail(
      ADMIN_EMAIL,
      'Booking Deletion',
      `A booking has been deleted for ${booking.car.make} ${booking.car.model} (${booking.car.year}). Customer email: ${booking.customer.gmail}.`
    );

    res.redirect('/bookings'); // Redirect to the bookings page
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).send('Internal Server Error');
  }
};
