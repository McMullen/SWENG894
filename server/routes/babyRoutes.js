const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const babyController = require('../controllers/babyController');

router.post('/add', authMiddleware, babyController.add);
router.post('/newMilestone', authMiddleware, babyController.newMilestone);

router.get('/user/babies', authMiddleware, babyController.getBabiesForUser);
router.get('/babyInfo/:babyId', authMiddleware, babyController.getBabyInfo);

module.exports = router;