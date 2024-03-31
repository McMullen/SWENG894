const {Model, DataTypes} = require('sequelize');
const sequelize = require('../../config/database');

class Medication extends Model {}
Medication.init({
  medicationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purpose: {
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
  healthRecordId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'HealthRecords',
      key: 'id'
    }
  }
},{
  sequelize,
  modelName: 'Medication',
  tableName: 'Medications',
});

module.exports = Medication;