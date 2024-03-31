const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const sleepController = require('../controllers/sleepController');

router.post('/new/:babyId', authMiddleware, sleepController.newSleep);

router.put('/update/:sleepId', authMiddleware, sleepController.updateSleep);

router.get('/get/:sleepId', authMiddleware, sleepController.getSleep);
router.get('/get-all/:babyId', authMiddleware, sleepController.getAllSleeps);

module.exports = router;