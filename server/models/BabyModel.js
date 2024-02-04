const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Baby extends Model{

}

Baby.init({
    babyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    birthWeight: {
        type: DataTypes.STRING,
        allowNull: true
    },
    birthHeight: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
        sequelize,
        modelName: 'Baby',
        tableName: 'Babies',
});

module.exports = Baby;