const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const app = express();
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const deleteRoutes = require('./routes/deleteRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/cars', carRoutes);
app.use('/', deleteRoutes);
app.use('/', adminRoutes);
// Database connection
mongoose.connect('mongodb://localhost/motorq8', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    seedDatabase(); // Seed the database after connection
  })
  .catch((err) => console.error(err));

// Function to seed the database
const seedDatabase = async () => {
  try {
    const existingUsers = await User.find();
    if (existingUsers.length === 0) {
      const users = [
        {
          make: 'Toyota',
          model: 'Corolla',
          year: 2020,
          licenceNumber: 'ABC123',
          registrationNumber: 'qwertyuiop',
          rentRate: 100,
          availableTablesByTimeSlot: [
            { timeSlot: '00:00', available: 1 },
            { timeSlot: '01:00', available: 1 },
            { timeSlot: '02:00', available: 1 },
            { timeSlot: '03:00', available: 1 },
            { timeSlot: '04:00', available: 1 },
            { timeSlot: '05:00', available: 1 },
            { timeSlot: '06:00', available: 1 },
            { timeSlot: '07:00', available: 1 },
            { timeSlot: '08:00', available: 1 },
            { timeSlot: '09:00', available: 1 },
            { timeSlot: '10:00', available: 1 },
            { timeSlot: '11:00', available: 1 },
            { timeSlot: '12:00', available: 1 },
            { timeSlot: '13:00', available: 1 },
            { timeSlot: '14:00', available: 1 },
            { timeSlot: '15:00', available: 1 },
            { timeSlot: '16:00', available: 1 },
            { timeSlot: '17:00', available: 1 },
            { timeSlot: '18:00', available: 1 },
            { timeSlot: '19:00', available: 1 },
            { timeSlot: '20:00', available: 1 },
            { timeSlot: '21:00', available: 1 },
            { timeSlot: '22:00', available: 1 },
            { timeSlot: '23:00', available: 1 },
          ],
        },
        {
          make: 'Honda',
          model: 'Civic',
          year: 2019,
          licenceNumber: 'XYZ789',
          registrationNumber: 'asdfghjkl',
          rentRate: 90,
          availableTablesByTimeSlot: [
            { timeSlot: '00:00', available: 1 },
            { timeSlot: '01:00', available: 1 },
            { timeSlot: '02:00', available: 1 },
            { timeSlot: '03:00', available: 1 },
            { timeSlot: '04:00', available: 1 },
            { timeSlot: '05:00', available: 1 },
            { timeSlot: '06:00', available: 1 },
            { timeSlot: '07:00', available: 1 },
            { timeSlot: '08:00', available: 1 },
            { timeSlot: '09:00', available: 1 },
            { timeSlot: '10:00', available: 1 },
            { timeSlot: '11:00', available: 1 },
            { timeSlot: '12:00', available: 1 },
            { timeSlot: '13:00', available: 1 },
            { timeSlot: '14:00', available: 1 },
            { timeSlot: '15:00', available: 1 },
            { timeSlot: '16:00', available: 1 },
            { timeSlot: '17:00', available: 1 },
            { timeSlot: '18:00', available: 1 },
            { timeSlot: '19:00', available: 1 },
            { timeSlot: '20:00', available: 1 },
            { timeSlot: '21:00', available: 1 },
            { timeSlot: '22:00', available: 1 },
            { timeSlot: '23:00', available: 1 },
          ],
        },
      ];

      await User.insertMany(users);
      console.log('Database seeded with initial car data');
    } else {
      console.log('Database already contains data');
    }
  } catch (err) {
    console.error('Error seeding the database:', err);
  }
};
app.use('/', ratingRoutes);
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/customerpage', (req, res) => {
  res.render('customerpage');
});
app.get('/adminpage', (req, res) => {
  res.render('adminpage');
});

app.get('/map', (req, res) => {
  res.render('map');
});
app.get('/deleteRequest', (req, res) => {
  res.render('deleteRequest');
});

app.use('/', userRoutes);

// Route to render the customer page
app.get('/customer', (req, res) => {
  res.render('customer', { cars: [] });
});

// app.get('/bookings', (req, res) => {
//   res.render('bookings');
// });


// app.get('/bookit', (req, res) => {
//   res.render('bookit' , { cars: [] });
// });
// router.post('/bookit', bookingController.bookCar);

// Route to handle search requests
app.get('/search', async (req, res) => {
  const { make, model, year } = req.query;

  if (!make || !model || !year) {
    return res.redirect('/customer');
  }

  try {
    const cars = await User.find({
      make: new RegExp(make, 'i'),
      model: new RegExp(model, 'i'),
      year: parseInt(year)
    });

    res.render('customer', { cars });
  } catch (err) {
    console.error('Error searching for cars:', err);
    res.redirect('/customer');
  }
});

// Import routes
const bookingRoutes = require('./routes/bookingRoutes');
const loginRoutes = require('./routes/loginRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Use routes
app.use('/', bookingRoutes);
app.use('/login', loginRoutes);
app.use('/dashboard', dashboardRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
