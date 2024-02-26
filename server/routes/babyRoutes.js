const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const babyController = require('../controllers/babyController');

router.post('/add', authMiddleware, babyController.add);

router.get('/user/babies', authMiddleware, babyController.getBabiesForUser);

module.exports = router;