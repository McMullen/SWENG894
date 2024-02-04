const express = require('express');
const router = express.Router();
const babyController = require('../controllers/babyController');

router.post('/add', babyController.add);

module.exports = router;