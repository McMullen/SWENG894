const sequelize = require('../config/database');
const setupAssociations = require('./HealthRecordSubTypes/associations');
const Baby = require('./BabyModel');
const User = require('./UserModel');
const Milestone = require('./MilestoneModel');
const HealthRecord = require('./HealthRecordModel');
const Medication = require('./HealthRecordSubTypes/MedicationModel');
const Vaccine = require('./HealthRecordSubTypes/VaccineModel');
const DoctorVisit = require('./HealthRecordSubTypes/DoctorVisitModel');
const HealthEvent = require('./HealthRecordSubTypes/HealthEventModel');
const Growth = require('./GrowthModel');
const CDC = require('./CDCModel');

const models = {
    Baby: Baby,
    User: User,
    Milestone: Milestone,
    HealthReacord: HealthRecord,
    Medication: Medication,
    Vaccine: Vaccine,
    DoctorVisit: DoctorVisit,
    HealthEvent: HealthEvent,
    Growth: Growth,
    CDC: CDC,
};

setupAssociations();

module.exports = models;