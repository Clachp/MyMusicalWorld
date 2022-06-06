const {Pool} = require('pg');

const config = {
    connectionString:process.env.DATABASE_URL
}

if (process.env.NODE_ENV === 'production') {
    // Configuration pour l'environnement Heroku
    config.ssl = {
        rejectUnauthorized : false
    }
}

const pool = new Pool(config);

console.log('Connected on Heroku Musical World database');

module.exports = pool;