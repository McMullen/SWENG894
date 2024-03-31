const HealthRecordModel = require('../models/HealthRecordModel');
const MedicationModel = require('../models/HealthRecordSubTypes/MedicationModel');
const VaccineModel = require('../models/HealthRecordSubTypes/VaccineModel');
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
        const { babyId } = req.params;
        const { vaccine } = req.body;
        const healthRecord = await HealthRecordModel.create({
            babyId: babyId,
            recordType: 'Vaccine',
            date: vaccine.dateGiven,
            description: vaccine.notes
        });

        if (!healthRecord) {
            return res.status(400).json({
                success: false,
                message: 'Failed to create health record for vaccine'
            });
        }

        const vaccineDetails = {
            vaccineName: vaccine.vaccineName,
            dateGiven: vaccine.dateGiven,
            nextDueDate: vaccine.nextDueDate,
            healthRecordId: healthRecord.id
        };
        const newVaccine = await VaccineModel.create(vaccineDetails);

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

exports.get_all_vaccinations = async(req, res) => {
    const { babyId } = req.params;

    try {
        const vaccineRecords = await HealthRecordModel.findAll({
            where: {
                babyId: babyId,
                recordType: 'Vaccine'
            },
            include: [{
                model: VaccineModel,
                as: 'vaccines',
            }]
        });

        if (!vaccineRecords) {
            return res.status(404).json({
                success: false,
                message: 'No vaccination records found for the specified baby.'
            });
        }

        res.status(200).json({
            success: true,
            data: vaccineRecords
        });
    } catch (error) {
        console.error('Error fetching vaccination records:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve vaccination records.',
            error: error.message
        });
    }
};