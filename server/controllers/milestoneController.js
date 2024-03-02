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

exports.updateMilestone = async(req, res) => {
    try {
        const { milestoneId } = req.params;
        const { babyId, name, date, age, type, description } = req.body;
        
        const milestone = await MilestoneModel.findByPk(milestoneId);

        //if (!milestone || milestone.userId !== req.user.id) {
        //    return res.status(404).json({ message: "Milestone not found or you don't have permission to update it" });
        //}

        const updatedMilestone = await milestone.update({
            babyId,
            name,
            date,
            age,
            type,
            description,
        });

        res.json(updatedMilestone);
    } catch (error) {
        console.error('Error updating milestone:', error);
        res.status(500).json({ message: 'Error updating milestone', error: error.message });
    }
};

exports.getMilestone = async(req, res) => {
    const { milestoneId } = req.params;
    const userId = req.userId;
    
    try{
        const milestone = await MilestoneModel.findByPk(milestoneId);
        res.json(milestone);
    }catch(error){
        res.status(500).json({message: 'Error retrieving milestones', error: error.message});
    }
};

exports.getAllMilestones = async(req, res) => {
    const { babyId } = req.params;
    const userId = req.userId;
    
    try{
        const baby = await BabyModel.findOne({ where: { id: babyId, userId: userId } });
        if (!baby) {
            return res.status(403).send({ message: "This baby is not registered to the current user." });
        }

        const milestones = await MilestoneModel.findAll({
            where: {babyId: babyId}
        });
        res.json(milestones);
    }catch(error){
        res.status(500).json({message: 'Error retrieving milestones', error: error.message});
    }
};