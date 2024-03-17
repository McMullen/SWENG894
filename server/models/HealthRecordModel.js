const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class HealthRecord extends Model{
    static associate(models){
        HealthRecord.belongsTo(models.Baby, {
            foreignKey: 'babyID',
            as: 'baby'
        });
    }
}

HealthRecord.init({
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
    recordId: {
        type: DataTypes.INTEGER,
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