const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to display the booking form
router.get('/bookit', (req, res) => {
  res.render('bookit'); // Render the form
});

// Route to handle form submission
router.post('/bookedCar', bookingController.bookCar);






router.get('/bookings', bookingController.getAllBookings);

// Route to update a booking
router.post('/bookings/update/:id', bookingController.updateBooking);

// Route to delete a booking
router.post('/bookings/delete/:id', bookingController.deleteBooking);




module.exports = router;
// const express = require('express');
// const router = express.Router();
// const bookingController = require('../controllers/bookingController');
// const User = require('../models/User');  // Import User model to fetch car details

// // Route to display the booking form with car details
// router.get('/book', async (req, res) => {
//   const { carId } = req.query;

//   if (!carId) {
//     return res.redirect('/customer');
//   }

//   try {
//     // Fetch the car details
//     const car = await User.findById(carId);
    
//     if (!car) {
//       return res.redirect('/customer');
//     }

//     // Get available time slots
//     const timeSlots = car.availableTablesByTimeSlot;
    
//     res.render('book', { car, timeSlots });
//   } catch (err) {
//     console.error('Error fetching car:', err);
//     res.redirect('/customer');
//   }
// });

// // Route to handle form submission
// router.post('/book', bookingController.bookCar);

// module.exports = router;
