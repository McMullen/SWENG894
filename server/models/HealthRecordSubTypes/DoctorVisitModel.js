const {Model, DataTypes} = require('sequelize');
const sequelize = require('../../config/database');

class DoctorVisit extends Model {}
DoctorVisit.init({
    doctorSeen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reasonForVisit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    visitDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},{
  sequelize,
  modelName: 'DoctorVisit',
  tableName: 'DoctorVisits',
});

module.exports = DoctorVisit;