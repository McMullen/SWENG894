const babyModel = require('../models/BabyModel');
const authService = require('../services/authService');

exports.add = async(req, res) => {
    if(!authService.isA)
    
    try{
        const {baby} = req.body;
        const {babyName, birthDate, sex, birthWeight, birthHeight} = baby;
        const newBaby = new babyModel(baby);
        await baby.save();

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