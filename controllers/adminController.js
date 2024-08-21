const Booking = require('../models/Booking');
const DeletedBooking = require('../models/DeletedBooking');
const { sendEmail } = require('../utils/email'); // Import email utility

const ADMIN_EMAIL = 'gvrgupta2008@gmail.com'; // Admin's email address

// Controller method to display pending deletions
exports.viewPendingDeletions = async (req, res) => {
  try {
    const deletedBookings = await DeletedBooking.find();
    res.render('adminView', { deletedBookings });
  } catch (error) {
    console.error('Error fetching pending deletions:', error);
    res.status(500).send('Internal server error');
  }
};

// Controller method to approve deletion
exports.approveDeletion = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the deleted booking request
    const deletedBooking = await DeletedBooking.findById(id);
    if (!deletedBooking) {
      return res.status(404).send('Deleted booking request not found');
    }

    // Delete the original booking
    await Booking.findByIdAndDelete(deletedBooking.originalBookingId);

    // Optionally, remove the deleted booking record
    await DeletedBooking.findByIdAndDelete(id);

    // Send notification email to the admin
    await sendEmail(
      ADMIN_EMAIL,
      'Booking Deletion Approved',
      `The booking for ${deletedBooking.car.make} ${deletedBooking.car.model} (${deletedBooking.car.year}) at ${deletedBooking.timeSlot} has been successfully deleted.`
    );

    res.redirect('/admin-view'); // Redirect to the admin view page
  } catch (error) {
    console.error('Error approving deletion:', error);
    res.status(500).send('Internal server error');
  }
};
