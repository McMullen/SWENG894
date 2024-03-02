const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const healthRecordController = require('../controllers/healthRecordController');

router.post('/add-medication', authMiddleware, healthRecordController.add_medication);

module.exports = router;