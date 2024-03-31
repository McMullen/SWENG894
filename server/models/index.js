const sequelize = require('../config/database');
const setupAssociations = require('../HealthRecordSubTypes/associations');
const Baby = require('./BabyModel');
const User = require('./UserModel');
const Milestone = require('./MilestoneModel');
const HealthRecord = require('./HealthRecordModel');
const Medication = require('./HealthRecordSubTypes/MedicationModel');
const Vaccine = require('./HealthRecordSubTypes/VaccineModel');
const DoctorVisit = require('./HealthRecordSubTypes/DoctorVisitModel');
const HealthEvent = require('./HealthRecordSubTypes/HealthEventModel');

const models = {
    Baby: Baby,
    User: User,
    Milestone: Milestone,
    HealthReacord: HealthRecord,
    Medication: Medication,
    Vaccine: Vaccine,
    DoctorVisit: DoctorVisit,
    HealthEvent: HealthEvent,
};

setupAssociations();
/** 
Object.keys(models).forEach((key) => {
    if('associate' in models[key]) {
        models[key].associate(models);
    }
});
*/
module.exports = models;