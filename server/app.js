const express = require('express');
const sequelize = require('./config/database');
const resolve = require('path').resolve;
const port = 3000;
const app = express();
app.use(express.json());
require('./routes')(app);

module.exports = app;

// Serve static files from the React app
app.use(express.static(resolve('../client/dist')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(resolve('../client/dist/index.html'));
});

// Sync models with the database
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced with models successfully.');

        const PORT = process.env.PORT || port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database with models:', err);
    });