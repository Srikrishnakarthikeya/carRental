const User = require('../models/User');

exports.getCarsByTimeSlot = async (req, res) => {
  try {
    const timeSlot = '10:00';
    const cars = await User.find();

    const carsWithAvailability = cars.map(car => {
      const availability = car.availableTablesByTimeSlot.find(slot => slot.timeSlot === timeSlot);
      return {
        ...car._doc,
        isAvailable: availability ? availability.available : 0,
      };
    });

    res.json(carsWithAvailability);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};
