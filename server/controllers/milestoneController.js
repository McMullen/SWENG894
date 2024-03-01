const MilestoneModel = require('../models/MilestoneModel');
const authService = require('../services/authService');

exports.newMilestone = async(req, res) => {
    try{
        const babyId = req.babyId;
        const { milestone } = req.body;
        const milestoneDetails = {...milestone, babyId};
        const newMilestone = new MilestoneModel(milestoneDetails);
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

exports.getMilestones = async(req, res) => {
    try{
        const userId = req.userId;
        const babyId = req.babyId;
        const milestones = await MilestoneModel.findAll({
            where: {babyId: babyId}
        });
        res.json(milestones);
    }catch(error){
        res.status(500).json({message: 'Error retrieving milestones', error: error.message});
    }
};