const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/deleteController');

router.post('/request-delete', deleteController.requestDelete);

module.exports = router;
