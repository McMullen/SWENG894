const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');
const secretKey = process.env.JWT_SECRET;

const authService = {
    authenticate: async(email, password) => {
        try{
            const user = await UserModel.fineOne({where: {email}});
            if(!user){
                throw new Error('Authentication failed: User not found.');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                throw new Error('Authentication failed: Incorrect password.');
            }

            const token = jwt.sign({id: user.id}, secretKey, {expiresIn: '1h'});
            return token;
        }catch(error){
            throw error;
        }
    },

    verifyToke: async(token) =>{
        try{
            const decoded = jwt.verify(token, secretKey);
            const user = await UserModel.findByPk(decoded.id);
            if(!user){
                throw new Error('Invalid token: User not found.');
            }
            return user;
        }catch(error){
            throw error;
        }
    },
};

module.exports = authService;