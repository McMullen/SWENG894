const {Sequelize} = require('sequelize');

const databaseConfig = {
    database: 'babybytes_db',
    username: 'db_user',
    password: 'db_password',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const sequelize = new Sequelize(
    databaseConfig.database,
    databaseConfig.username,
    databaseConfig.password, {
        host: databaseConfig.host,
        dialect: databaseConfig.dialect,
        pool: databaseConfig.pool
    }
);

// Test the connection
(async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully');
    }catch(error){
        console.error('Unable to connect to the database: ', error);
    }
})();

module.exports = sequelize;