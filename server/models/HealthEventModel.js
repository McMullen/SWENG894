const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class HealthEvent extends Model{
    static associate(models){
        HealthEvent.belongsTo(models.HealthRecord, {
            foreignKey: 'HealthRecordID',
            as: 'healthRecord'
        });
    }
}

HealthEvent.init({
    healthRecordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'HealthRecords',
            key: 'id',
        },
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    outcome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},{
        sequelize,
        modelName: 'HealthEvent',
        tableName: 'HealthEvents',
});

module.exports = HealthEvent;