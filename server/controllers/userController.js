const userModel = require('../models/UserModel');
const authService = require('../services/authService');

exports.register = async(req, res) => {
    try{
        const newUser = new userModel(req.body);
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
};

exports.login = async(req, res) => {
    try{
        const user = await authService.authenticate(req.body.email, req.body.password);

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Authentication failed'
            });
        }

        const token = authService.generatedToken(user);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};