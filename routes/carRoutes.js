const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router.get('/', carController.getCarsByTimeSlot);

module.exports = router;
