const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const milestoneController = require('../controllers/milestoneController');

router.post('/new/:babyId', authMiddleware, milestoneController.newMilestone);

router.put('/update/:milestoneId', authMiddleware, milestoneController.updateMilestone);

router.get('/get/:milestoneId', authMiddleware, milestoneController.getMilestone);
router.get('/get-all/:babyId', authMiddleware, milestoneController.getAllMilestones);

module.exports = router;