const userRoutes = require('./userRoutes');
const babyRoutes = require('./babyRoutes');
//const parentRoutes = require('./parentRoutes');
//const healthRoutes = require('./healthRoutes');
//const milestoneRoutes = require('./milestoneRoutes');
//const foodRoutes = require('./foodRoutes');
//const sleepRoutes = require('./sleepRoutes');

module.exports = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/baby', babyRoutes);
    //app.use('/api/parent', parentRoutes);
    //app.use('/api/health', healthRoutes);
    //app.use('/api/milestone', milestoneRoutes);
    //app.use('/api/food', foodRoutes);
    //app.use('/api/sleep', sleepRoutes);
};