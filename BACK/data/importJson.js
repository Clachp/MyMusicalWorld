require('dotenv').config();

const users = require('./user.json');

const client = require('../app/database');


// Method to import some json data in "USER" table
const importData = async () => {


    await client.query('TRUNCATE "USER", album, track, user_likes_track, user_likes_album, user_likes_artist RESTART IDENTITY');

    const usersIds = {};

    for(const user of users) {
        const {rows} = await client.query('INSERT INTO "USER"(mail, lastname, firstname, pseudo, "password") VALUES($1, $2, $3, $4, $5) RETURNING id', 
        [user.mail,
        user.lastname,
        user.firstname,
        user.pseudo,
        user.password]); ; 
        console.log(rows);
        usersIds[user.mail] = rows[0].id; 
    }
    console.log(usersIds);
    console.log(users);
    
    client.end();
};

importData();