const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Medication extends Model{
    static associate(models){
        Medication.belongsTo(models.HealthRecord, {
            foreignKey: 'HealthRecordID',
            as: 'healthRecord'
        });
    }
}

Medication.init({
    healthRecordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'HealthRecords',
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    dosage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    frequency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    currentlyTaking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
},{
        sequelize,
        modelName: 'Medication',
        tableName: 'Medications',
});

module.exports = Medication;