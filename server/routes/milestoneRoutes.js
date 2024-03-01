const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const milestoneController = require('../controllers/milestoneController');

router.post('/new/:babyId', authMiddleware, milestoneController.newMilestone);

router.get('/get', authMiddleware, milestoneController.getMilestones);

module.exports = router;