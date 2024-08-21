const User = require('../models/User');

// List all cars
exports.listCars = async (req, res) => {
  try {
    const cars = await User.find();
    res.render('cars/index', { cars });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.redirect('/error');
  }
};

// Show form for adding a new car
exports.newCarForm = (req, res) => {
  res.render('cars/new');
};

// Add a new car
exports.addCar = async (req, res) => {
  try {
    const { make, model, year, registrationNumber, rentRate } = req.body;
    const newCar = new User({ make, model, year, registrationNumber, rentRate });
    await newCar.save();
    res.redirect('/cars');
  } catch (error) {
    console.error('Error adding car:', error);
    res.redirect('/error');
  }
};

// Show form for updating a car
exports.editCarForm = async (req, res) => {
  try {
    const car = await User.findById(req.params.id);
    if (car) {
      res.render('cars/edit', { car });
    } else {
      res.redirect('/cars');
    }
  } catch (error) {
    console.error('Error fetching car for edit:', error);
    res.redirect('/error');
  }
};

// Update a car
exports.updateCar = async (req, res) => {
  try {
    const { make, model, year, registrationNumber, rentRate } = req.body;
    await User.findByIdAndUpdate(req.params.id, { make, model, year, registrationNumber, rentRate });
    res.redirect('/cars');
  } catch (error) {
    console.error('Error updating car:', error);
    res.redirect('/error');
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/cars');
  } catch (error) {
    console.error('Error deleting car:', error);
    res.redirect('/error');
  }
};
