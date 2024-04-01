const GrowthModel = require('../models/GrowthModel');
const authService = require('../services/authService');

exports.newGrowth = async(req, res) => {
    const { date, age, height, weight, description } = req.body;
    const { babyId } = req.params;
    const userId = req.userId;

    try{
        const baby = await BabyModel.findOne({ where: { id: babyId, userId: userId } });
        if (!baby) {
            return res.status(403).send({ message: "This baby is not registered to the current user." });
        }

        const { growth } = req.body;
        const growthDetails = {...growth, babyId};
        const newGrowth = new GrowthModel(growthDetails);
        await newGrowth.save();

        res.status(201).json({
            success: true,
            message: 'Growth record registered successfully',
            data: newGrowth
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Adding a new growth record failed',
            error: error.message
        });
    }
};

exports.updateGrowth = async(req, res) => {
    //
};

exports.getGrowth = async(req, res) => {
    const { growthId } = req.params;
    const userId = req.userId;
    
    try{
        const growth = await GrowthModel.findByPk(growthId);
        res.json(growth);
    }catch(error){
        res.status(500).json({message: 'Error retrieving growth record', error: error.message});
    }
};

exports.getAllGrowths = async(req, res) => {
    const { babyId } = req.params;
    const userId = req.userId;
    
    try{
        const baby = await BabyModel.findOne({ where: { id: babyId, userId: userId } });
        if (!baby) {
            return res.status(403).send({ message: "This baby is not registered to the current user." });
        }

        const growths = await GrowthModel.findAll({
            where: {babyId: babyId}
        });
        res.json(growths);
    }catch(error){
        res.status(500).json({message: 'Error retrieving growth records', error: error.message});
    }
};