const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const healthRecordController = require('../controllers/healthRecordController');

router.post('/add-medication', authMiddleware, healthRecordController.add_medication);

router.get('/get-all-vaccinations/:babyId', authMiddleware, healthRecordController.get_all_vaccinations);
router.post('/add-vaccination/:babyId', authMiddleware, healthRecordController.add_vaccination);

module.exports = router;