const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

class User extends Model {
    async isValidPassword(password){
        return await bcrypt.compare(password, this.password);
    }
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    hooks: {
        beforeSave: async(user) => {
            if(user.password){
                user.password = await bcrypt.hash(user.password, 8);
            }
        },
    },
});

module.exports = User;