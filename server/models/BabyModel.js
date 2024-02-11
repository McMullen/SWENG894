const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Baby extends Model{
    static associate(models){
        Baby.belongsTo(models.User, {
            foreignKey: 'userID',
            as: 'user'
        });
    }
}

Baby.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
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