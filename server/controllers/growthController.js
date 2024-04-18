const GrowthModel = require('../models/GrowthModel');
const BabyModel = require('../models/BabyModel');
const CDCModel = require('../models/CDCModel');
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

exports.getCDCData = async(req, res) => {
    try {
        const data = await CDCModel.findAll({
            attributes: ['Age', '3rd', '5th', '10th', '25th', '50th', '75th', '90th', '95th', '97th'],
            where: {Sex: 'M'},
            order: [['Age', 'ASC']]
        });
        const cdcData = data.map(entry => entry.get({ plain: true }));

        // Finding corresponding CDC data for the current age
        const currentAge = 24.5;
        const currentHeight = 84;
        const currentCdcData = cdcData.find(entry => entry.Age === currentAge);

        // Finding corresponding CDC data for the future age
        const futureAge = 30.5;
        const futureHeight = 91;
        const futureCdcData = cdcData.find(entry => entry.Age === futureAge);

        // Constructing the feature vector
        const percentiles = [
            currentCdcData['3rd'], currentCdcData['5th'], currentCdcData['10th'],
            currentCdcData['25th'], currentCdcData['50th'], currentCdcData['75th'],
            currentCdcData['90th'], currentCdcData['95th'], currentCdcData['97th']
        ];
        const features = [currentAge, currentHeight, ...percentiles];

        // Labels array
        const labels = [futureHeight];

        // Create the model
        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [11], units: 10, activation: 'relu' }));
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

        const newFeatureArray = [25.5, 81, ...percentiles];
        const newFeatures = tf.tensor2d([newFeatureArray]);
        const predictedHeight = model.predict(newFeatures);
        predictedHeight.data().then(data => {
            console.log('Predicted Future Height:', data[0]);
            res.json({ predictedHeight: data[0] });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

function standardizeData(data, cdcData) {
    // Extract features for current data
    const currentFeatures = data.map(d => {
        const entry = cdcData.find(e => e.Age === d.currentAge);
        return entry ? [d.currentAge, d.currentHeight, entry['3rd'], entry['5th'], entry['10th'], entry['25th'], entry['50th'], entry['75th'], entry['90th'], entry['95th'], entry['97th']] : [d.currentAge, d.currentHeight].concat(new Array(9).fill(0));
    });

    // Extract features for future data
    const futureFeatures = data.map(d => {
        const entry = cdcData.find(e => e.Age === d.futureAge);
        return entry ? [d.futureAge, entry['3rd'], entry['5th'], entry['10th'], entry['25th'], entry['50th'], entry['75th'], entry['90th'], entry['95th'], entry['97th']] : [d.futureAge].concat(new Array(9).fill(0));
    });

    // Convert arrays to tensors
    const currentInputs = tf.tensor2d(currentFeatures, [data.length, 11]); // Shape [number of data points, features per data point]
    const futureInputs = tf.tensor2d(futureFeatures, [data.length, 10]); // Future inputs do not include 'currentHeight'

    // Standardize current inputs
    const currentMean = currentInputs.mean(0);
    const currentStd = computeStandardDeviation(currentInputs);
    const normalizedCurrentInputs = currentInputs.sub(currentMean).div(currentStd);

    console.log("Mean",currentMean.dataSync());
    console.log("Current STD",currentStd.dataSync());
    console.log("Current normalized",normalizedCurrentInputs.dataSync());
    // Standardize future inputs
    const futureMean = futureInputs.mean(0);
    const futureStd = computeStandardDeviation(futureInputs);
    const normalizedFutureInputs = futureInputs.sub(futureMean).div(futureStd);

    console.log(futureMean.dataSync());
    console.log(futureStd.dataSync());
    console.log(normalizedFutureInputs.dataSync());
    // Concatenate normalized current and future inputs along the feature axis
    const combinedInputs = tf.concat([normalizedCurrentInputs, normalizedFutureInputs], 1);

    console.log(combinedInputs.dataSync());
    return {
        inputs: combinedInputs,
        currentNormalizationConstants: { mean: currentMean, std: currentStd },
        futureNormalizationConstants: { mean: futureMean, std: futureStd }
    };
}

function computeStandardDeviation(tensor) {
    const mean = tensor.mean(0);
    console.log("tensor",tensor.dataSync());
    console.log("mean",mean.dataSync());
    const squaredDifference = tensor.sub(mean).square();
    const epsilon = 1e-8;  // Small number to ensure no division by zero
    const variance = squaredDifference.mean(0).add(epsilon);  // Adding epsilon to the variance
    return variance.sqrt();
}


function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({
        inputShape: [21], 
        units: 10,
        activation: 'relu'
    }));

    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError',
        metrics: ['mse']
    });
    return model;
}

async function trainModel(model, inputs, labels) {
    const history = await model.fit(inputs, labels, {
      epochs: 100,
      batchSize: 32,
      validationSplit: 0.2
    });
  
    return model;
}

function predictHeight(model, currentAge, currentHeight, futureAge, percentiles, normalizationConstants) {
    // Update this function if necessary to use the new normalization constants correctly
    const { mean, std } = normalizationConstants;
    const ageDiff = futureAge - currentAge;
    const inputsArray = [currentAge, currentHeight, ageDiff, ...percentiles];
    const inputsTensor = tf.tensor2d([inputsArray]);
    const normalizedInputs = inputsTensor.sub(mean).div(std); // Ensure you're using standardization correctly here
    
    const normalizedHeight = model.predict(normalizedInputs);
    const predictedHeight = normalizedHeight.dataSync()[0]; // Updated to correctly handle tensor outputs
    
    return predictedHeight;
}
  