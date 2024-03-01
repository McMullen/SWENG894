const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const milestoneController = require('../controllers/milestoneController');

router.post('/newMilestone', authMiddleware, milestoneController.newMilestone);

router.get('/getMilestones', authMiddleware, milestoneController.getMilestones);

module.exports = router;