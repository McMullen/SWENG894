const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Growth extends Model{
    static associate(models){
        Growth.belongsTo(models.Baby, {
            foreignKey: 'babyID',
            as: 'baby'
        });
    }
}

Growth.init({
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
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
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
        modelName: 'Growth',
        tableName: 'GrowthRecords',
});

module.exports = Growth;