const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class TrainingData extends Model{
    static associate(models){
    }
}

TrainingData.init({
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    futureAge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    futureHeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    percentiles: {
        type: DataTypes.STRING,
        allowNull: true
    },
    futurePercentiles: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
        sequelize,
        modelName: 'TrainingData',
        tableName: 'TrainingData',
});

module.exports = TrainingData;