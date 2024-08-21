const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin-view', adminController.viewPendingDeletions);
router.post('/approve-delete/:id', adminController.approveDeletion);

module.exports = router;
