const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Milestone extends Model{
    static associate(models){
        Milestone.belongsTo(models.Baby, {
            foreignKey: 'babyID',
            as: 'baby'
        });
    }
}

Milestone.init({
    babyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Babies',
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
        sequelize,
        modelName: 'Milestone',
        tableName: 'Milestones',
});

module.exports = Milestone;