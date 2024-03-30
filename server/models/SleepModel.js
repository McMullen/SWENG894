const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Sleep extends Model{
    static associate(models){
        Sleep.belongsTo(models.Baby, {
            foreignKey: 'babyID',
            as: 'baby'
        });
    }
}

Sleep.init({
    babyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Babies',
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    numWakeUps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
        sequelize,
        modelName: 'Sleep',
        tableName: 'SleepRecords',
});

module.exports = Sleep;