const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const growthController = require('../controllers/growthController');

router.post('/new/:babyId', authMiddleware, growthController.newGrowth);

router.put('/update/:growthId', authMiddleware, growthController.updateGrowth);

router.get('/get/:growthId', authMiddleware, growthController.getGrowth);
router.get('/get-all/:babyId', authMiddleware, growthController.getAllGrowths);

router.get('/get-predicted-height/:babyId', authMiddleware, growthController.getPredcitedHeight);

module.exports = router;