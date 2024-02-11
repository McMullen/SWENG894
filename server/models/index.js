const sequelize = require('../config/database');
const Baby = require('./BabyModel');
const User = require('./UserModel');

const models = {
    Baby: Baby,
    User: User,
};

Objects.keys(models).forEach((key) => {
    if('associate' in models[key]) {
        models[key].associate(models);
    }
});

module.exports = models;