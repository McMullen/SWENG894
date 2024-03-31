const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class HealthRecord extends Model{
    static associate(models){
        HealthRecord.belongsTo(models.Baby, {
            foreignKey: 'babyId',
            as: 'baby'
        });
    }
}

HealthRecord.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    babyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Babies',
            key: 'id',
        },
    },
    recordType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
        sequelize,
        modelName: 'HealthRecord',
        tableName: 'HealthRecords',
});

module.exports = HealthRecord;