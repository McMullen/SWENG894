const {Model, DataTypes} = require('sequelize');
const sequelize = require('../../config/database');

class Vaccine extends Model {}

Vaccine.init({
  vaccineName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateGiven: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nextDueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  }
},{
  sequelize,
  modelName: 'Vaccine',
  tableName: 'Vaccines',
});