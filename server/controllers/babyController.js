const babyModel = require('../models/BabyModel');
const authService = require('../services/authService');

exports.add = async(req, res) => {
    try{
        const userId = req.userId;
        const { baby } = req.body;
        const { babyName, birthDate, sex, birthWeight, birthHeight } = baby;
        const babyDetails = {...baby, userId};
        const newBaby = new babyModel(babyDetails);
        await newBaby.save();

        res.status(201).json({
            success: true,
            message: 'Baby registered syccessfully',
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

exports.newMilestone = async(req, res) => {
    try{
        const babyId = req.babyId;
        const { milestone } = req.body;
        const milestoneDetails = {...milestone, babyId};
        const newMilestone = new milestoneModel(milestoneDetails);
        await newMilestone.save();
        
        res.status(201).json({
            success: true,
            message: 'Milestone registered syccessfully',
            data: newMilestone
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Adding a new milestone failed',
            error: error.message
        });
    }
};