const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Baby extends Model{
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
    }
},{
        sequelize,
        modelName: 'Milestone',
        tableName: 'Milestones',
});

module.exports = Milestone;