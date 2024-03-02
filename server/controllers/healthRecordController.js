const HealthRecordModel = require('../models/HealthRecordModel');
const MedicationModel = require('../models/MedicationModel');
const authService = require('../services/authService');

exports.add_medication = async(req, res) => {
    try{
        const userId = req.userId;
        const { baby } = req.body;
        const { babyName, birthDate, sex, birthWeight, birthHeight } = baby;
        const babyDetails = {...baby, userId};
        const newBaby = new BabyModel(babyDetails);
        await newBaby.save();

        res.status(201).json({
            success: true,
            message: 'Baby registered successfully',
            data: newBaby
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Adding a new baby failed',
            error: error.message
        });
    }
};