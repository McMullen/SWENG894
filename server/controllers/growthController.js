const GrowthModel = require('../models/GrowthModel');
const BabyModel = require('../models/BabyModel');
const CDCModel = require('../models/CDCModel');
const TrainingModel = require('../models/TrainingModel');
const authService = require('../services/authService');
const tf = require('@tensorflow/tfjs');

exports.newGrowth = async(req, res) => {
    const { date, age, height, weight, description } = req.body;
    const { babyId } = req.params;
    const userId = req.userId;

    try{
        const baby = await BabyModel.findOne({ where: { id: babyId, userId: userId } });
        if (!baby) {
            return res.status(403).send({ message: "This baby is not registered to the current user." });
        }

        const { growth } = req.body;
        const growthDetails = {...growth, babyId};
        const newGrowth = new GrowthModel(growthDetails);
        await newGrowth.save();

        res.status(201).json({
            success: true,
            message: 'Growth record registered successfully',
            data: newGrowth
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Adding a new growth record failed',
            error: error.message
        });
    }
};

exports.updateGrowth = async(req, res) => {
    //
};

exports.getGrowth = async(req, res) => {
    const { growthId } = req.params;
    const userId = req.userId;
    
    try{
        const growth = await GrowthModel.findByPk(growthId);
        res.json(growth);
    }catch(error){
        res.status(500).json({message: 'Error retrieving growth record', error: error.message});
    }
};

exports.getAllGrowths = async(req, res) => {
    const { babyId } = req.params;
    const userId = req.userId;
    
    try{
        const baby = await BabyModel.findOne({ where: { id: babyId, userId: userId } });
        if (!baby) {
            return res.status(403).send({ message: "This baby is not registered to the current user." });
        }

        const growths = await GrowthModel.findAll({
            where: {babyId: babyId}
        });
        res.json(growths);
    }catch(error){
        res.status(500).json({message: 'Error retrieving growth records', error: error.message});
    }
};

const getRecentGrowths = async (babyId) => {
    try {
        const recentGrowth = await GrowthModel.findOne({
            where: { babyId: babyId },
            order: [['date', 'DESC']] 
        });
        return recentGrowth;
    } catch (error) {
        console.error("Error retrieving recent growths:", error);
        return null;
    }
};

exports.getPredcitedHeight = async(req, res) => {
    try {
        const { babyId } = req.params;

        const data = await CDCModel.findAll({
            attributes: ['Age', '3rd', '5th', '10th', '25th', '50th', '75th', '90th', '95th', '97th'],
            where: {Sex: 'M'},
            order: [['Age', 'ASC']]
        });
        const cdcData = data.map(entry => entry.get({ plain: true }));

        const tD = await TrainingModel.findAll({
            attributes: ['age', 'futureAge', 'height', 'futureHeight', 'percentiles', 'futurePercentiles'],
            where: {sex: 'M'},
            order: [['age', 'ASC']]
        });
        const trainingData = tD.map(entry => entry.get({ plain: true }));

        // Gathering training data for model
        const currentAge = trainingData.age;
        const currentHeight = trainingData.height;
        const currentCdcData = trainingData.percentiles;
        const futureAge = trainingData.futureAge;
        const futureHeight = trainingData.futureHeight;
        const futureCdcData = trainingData.futurePercentiles;

        // Constructing the feature vector
        const currentPercentiles = [
            currentCdcData['3rd'], currentCdcData['5th'], currentCdcData['10th'],
            currentCdcData['25th'], currentCdcData['50th'], currentCdcData['75th'],
            currentCdcData['90th'], currentCdcData['95th'], currentCdcData['97th']
        ];
        const futurePercentiles = [
            futureCdcData['3rd'], futureCdcData['5th'], futureCdcData['10th'],
            futureCdcData['25th'], futureCdcData['50th'], futureCdcData['75th'],
            futureCdcData['90th'], futureCdcData['95th'], futureCdcData['97th']
        ];
        const features = [currentAge, currentHeight, ...currentPercentiles, futureAge, ...futurePercentiles];

        // Labels array
        const labels = [futureHeight];

        // Create the model
        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [21], units: 64, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 1 }));
        model.compile({
            optimizer: 'adam',
            loss: 'meanSquaredError',
            metrics: ['mae']
        });

        // Convert features and labels to tensors
        const featureTensor = tf.tensor2d([features]);
        const labelTensor = tf.tensor2d([labels]);

        // Train the model
        await model.fit(featureTensor, labelTensor, {
            epochs: 50,
            validationSplit: 0.2
        });

        recentGrowth = await getRecentGrowths(babyId);
        currentAge = recentGrowth.age;
        currentHeight = recentGrowth.height;
        currentCdcData = cdcData.find(entry => entry.Age === currentAge);
        futureAge = JSON.parse(req.query.futureAge);

        const newFeatureArray = [currentAge, currentHeight, ...currentPercentiles, futureAge, ...futurePercentiles];
        const newFeatures = tf.tensor2d([newFeatureArray]);
        const predictedHeight = model.predict(newFeatures);
        predictedHeight.data().then(data => {
            res.json({ predictedHeight: data[0] });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};