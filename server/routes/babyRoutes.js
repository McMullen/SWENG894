const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const babyController = require('../controllers/babyController');

router.post('/add', authMiddleware, babyController.add);

module.exports = router;