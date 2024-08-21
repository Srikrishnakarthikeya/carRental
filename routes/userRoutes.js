const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to list all cars
router.get('/cars', userController.listCars);

// Route to show form for adding a new car
router.get('/cars/new', userController.newCarForm);

// Route to handle new car submission
router.post('/cars', userController.addCar);

// Route to show form for updating a car
router.get('/cars/edit/:id', userController.editCarForm);

// Route to handle car update
router.post('/cars/update/:id', userController.updateCar);

// Route to delete a car
router.post('/cars/delete/:id', userController.deleteCar);

module.exports = router;
