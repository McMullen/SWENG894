const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class DoctorVisit extends Model{
    static associate(models){
        DoctorVisit.belongsTo(models.HealthRecord, {
            foreignKey: 'HealthRecordID',
            as: 'healthRecord'
        });
    }
}

DoctorVisit.init({
    healthRecordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'HealthRecords',
            key: 'id',
        },
    },
    doctorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    visitDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
        sequelize,
        modelName: 'DoctorVisit',
        tableName: 'DoctorVisits',
});

module.exports = Medication;