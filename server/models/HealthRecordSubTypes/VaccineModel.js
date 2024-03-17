class Vaccine extends Model {}
Vaccine.init({
  vaccineType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vaccineDate: {
    type: DataTypes.DATE,
    allowNull: false,
  }
},{
  sequelize,
  modelName: 'Vaccine',
  tableName: 'Vaccines',
});