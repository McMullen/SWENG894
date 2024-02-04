const babyModel = require('../models/BabyModel');

exports.add = async(req, res) => {
    try{
        console.log(req.body);
        //const {baby} = req.body;
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