const BabyModel = require('../models/BabyModel');
const authService = require('../services/authService');

exports.add = async(req, res) => {
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

exports.getBabiesForUser = async(req, res) => {
    try{
        const userId = req.userId;
        const babies = await BabyModel.findAll({
            where: {userId: userId}
        });
        res.json(babies);
    }catch(error){
        res.status(500).json({message: 'Error retrieving babies', error: error.message});
    }
};


exports.getBabyInfo = async (req, res) => {
    try {
        const { babyId } = req.params;
        const baby = await BabyModel.findByPk(babyId);

        if (!baby) {
            return res.status(404).json({ message: 'Baby not found' });
        }
        res.json(baby);
    } catch (error) {
        console.error('Error fetching baby information:', error);
        res.status(500).json({ message: 'Error fetching baby information', error: error.message });
    }
};
