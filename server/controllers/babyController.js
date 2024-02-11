const babyModel = require('../models/BabyModel');
const authService = require('../services/authService');

exports.add = async(req, res) => {
    try{
        const userId = req.userId;
        console.log(userId);
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