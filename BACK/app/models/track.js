const client = require('../database');

/**
 * An entity representing a music album
 * @typedef {object} Track
 * @property {number} id
 * @property {string} name
 * @property {string} genre
 * @property {string} artist
 * @property {number} year
 * @property {string} album
 * @property {string} url_image
 * @property {number} api_id
 * @property {string} url_sample
 */


/**
 * A model representing a music track
 * @class Track
 */
class Track {

    /**
    * The Track constructor
    * @param {object} obj a litteral object with properties copied into the instance
    */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Add a music track to the user's dashboard
     * @param {number} userId 
     * @param {number} itemId 
     * @returns {object<Track}
     * @throws {error} a potential SQL error
     * @async
     */
    async addTrack(userId, itemId) {

        try {

            const checkTrack = await client.query(`SELECT * FROM TRACK WHERE api_id=$1`, [itemId]);
       

            if (checkTrack.rows[0]) {

                const checkUserLikesTrack = await client.query(`SELECT * FROM USER_LIKES_TRACK WHERE (api_id, user_id)=($1, $2);`, [itemId, userId]);

                if (checkUserLikesTrack.rows[0]) {
                    console.log('chanson deja likée');
                    throw new Error('chanson déjà likée');
                }
            } else {

                const { rows } = await client.query(
                    'INSERT INTO TRACK(name, genre, artist, year, album, url_image, api_id, url_sample) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
                    [this.name,
                    this.genre,
                    this.artist,
                    this.year,
                    this.album,
                    this.urlImage,
                        itemId,
                    this.urlSample]);
                itemId = this.apiId;

            }

            await client.query('INSERT INTO USER_LIKES_TRACK (api_id, user_id) VALUES ($1, $2)', [itemId, userId]);
            console.log('Chanson ajoutée à votre bibliotheque')
            return this;

        } catch (error) {

            console.log('error du model');
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }

    /**
     * remove the Track with the given itemId from the user's dashboard
     * @param {number} userId 
     * @param {number} itemId 
     * @returns {string} Trackname - the name of the track that just have been removed from the user's dashboard
     * @throws {error} a potential SQL error
     * @static
     * @async
     */
    static async delete(userId, itemId) {

        try {
            await client.query('DELETE FROM USER_LIKES_TRACK WHERE (api_id, user_id)=($1, $2)', [itemId, userId]);

            const track = await client.query('SELECT * FROM TRACK WHERE api_id=$1', [itemId]);
            const trackName = track.rows[0].name;
            return trackName;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Track;