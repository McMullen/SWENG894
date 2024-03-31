const HealthRecord = require('../HealthRecordModel');
const Vaccine = require('./VaccineModel');
const Medication = require('./MedicationModel');
const Baby = require('../BabyModel'); // Assuming you also have a Baby model

const setupAssociations = () => {
    // Define associations here
    HealthRecord.belongsTo(Baby, { foreignKey: 'babyId', as: 'baby' });
    Baby.hasMany(HealthRecord, { foreignKey: 'babyId', as: 'healthRecords' });

    HealthRecord.hasMany(Vaccine, { foreignKey: 'healthRecordId', as: 'vaccines' });
    Vaccine.belongsTo(HealthRecord, { foreignKey: 'healthRecordId', as: 'healthRecord' });

    HealthRecord.hasMany(Medication, { foreignKey: 'healthRecordId', as: 'medications' });
    Medication.belongsTo(HealthRecord, { foreignKey: 'healthRecordId', as: 'healthRecord' });

    // Add more associations as needed
};

module.exports = setupAssociations;
