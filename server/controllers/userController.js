const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');
const authService = require('../services/authService');

exports.register = async(req, res) => {
    try{
        const { user } = req.body;
        const { name, email, password } = user;
        const newUser = new userModel(user);
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
        const {email, password} = req.body;
        const user = await userModel.findOne({where: {email}});
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({token});
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};