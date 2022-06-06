const client = require('../database');

class Music {


    static async getMusic(pseudo) {
        try {

            const music = await client.query('SELECT * FROM user_music WHERE pseudo=$1', [pseudo]);

            if (music.rows[0].artists[0] === null) {
                music.rows[0].artists = [];
            }

            if (music.rows[0].tracks[0] === null) {
                music.rows[0].tracks = [];
            }

            if (music.rows[0].albums[0] === null) {
                music.rows[0].albums = [];
            }

            return music.rows[0];

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }
    }

};


module.exports = Music;