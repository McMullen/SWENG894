const MilestoneModel = require('../models/MilestoneModel');
const BabyModel = require('../models/BabyModel');
const authService = require('../services/authService');

exports.newMilestone = async(req, res) => {
    const { name, date, type, description } = req.body;
    const { babyId } = req.params;
    const userId = req.userId;
    
    try{
        const baby = await BabyModel.findOne({ where: { id: babyId, userId: userId } });
        if (!baby) {
            return res.status(403).send({ message: "This baby is not registered to the current user." });
        }

        const { milestone } = req.body;
        const milestoneDetails = {...milestone, babyId};
        const newMilestone = new MilestoneModel(milestoneDetails);
        await newMilestone.save();

        res.status(201).json({
            success: true,
            message: 'Milestone registered successfully',
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