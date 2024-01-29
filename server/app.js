const express = require("express");
const sequelize = require('./config/database'); 
const app = express();
app.use(express.json());
const port = 3000;
require('./routes')(app);

module.exports = app;

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", (req, res) => {
  res.json([
    {
      id: 1,
      name: "User Userson",
    },
  ]);
});

// Sync models with the database
sequelize.sync({ force: false }) // Change to true only if you want to drop and recreate tables
    .then(() => {
        console.log('Database synced with models successfully.');

        const PORT = process.env.PORT || 3000;
        //app.listen(PORT, () => {
        //    console.log(`Server is running on port ${PORT}`);
        //});
    })
    .catch(err => {
        console.error('Failed to sync database with models:', err);
    });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));