const HealthRecordModel = require('../models/HealthRecordModel');
const MedicationModel = require('../models/HealthRecordSubTypes/MedicationModel');
const VaccinationModel = require('../models/HealthRecordSubTypes/VaccineModel');
const authService = require('../services/authService');

exports.add_medication = async(req, res) => {
    try{
        const babyId = req.babyId;
        const { medication } = req.body;
        const { medicationName, dosage, purpose, startDate, endDate } = medication;
        const medicationDetails = {...medication, babyId};
        const newMedication = new MedicationModel(medicationDetails);
        await newMedication.save();

        res.status(201).json({
            success: true,
            message: 'Medication registered successfully',
            data: newMedication
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Adding a new medication failed',
            error: error.message
        });
    }
};

exports.add_vaccination = async(req, res) => {
    try{
        console.log(req.body);
        const babyId = req.babyId;
        const { vaccine } = req.body;
        const {vaccineName, dateGiven, nextDueDate, notes} = vaccine;
        const vaccineDetails = {...vaccine, babyId};
        const newVaccine = new VaccinationModel(vaccineDetails);
        await newVaccine.save();

        res.status(201).json({
            success: true,
            message: 'Vaccine registered successfully',
            data: newVaccine
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Adding a new vaccine failed',
            error: error.message
        });
    }
};