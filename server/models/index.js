const sequelize = require('../config/database');
const Baby = require('./BabyModel');
const User = require('./UserModel');
const Milestone = require('./MilestoneModel');
const HealthRecord = require('/HealthRecordModel');
const Medication = require('./MedicationModel');
const DoctorVisit = require('./DoctorVisitModel');
const HealthEvent = require('./HealthEventModel');

const models = {
    Baby: Baby,
    User: User,
    Milestone: Milestone,
    HealthReacord: HealthRecord,
    Medication: Medication,
    DoctorVisit: DoctorVisit,
    HealthEvent: HealthEvent,
};

Objects.keys(models).forEach((key) => {
    if('associate' in models[key]) {
        models[key].associate(models);
    }
});

module.exports = models;