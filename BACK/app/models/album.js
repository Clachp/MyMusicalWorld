const client = require('../database');


/**
 * An entity representing a music album
 * @typedef {object} Album
 * @property {number} id
 * @property {string} name
 * @property {string} genre
 * @property {string} artist
 * @property {number} year
 * @property {string} url_image
 * @property {number} api_id
 */

/**
 * A model representing a music album
 * @class Album
 */
class Album {


    /**
    * The Album constructor
    * @param {object} obj a litteral object with properties copied into the instance
    */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Add a music album to the user's dashboard
     * @param {number} userId 
     * @param {number} itemId 
     * @returns {object<Album>}
     * @throws {error} a potential SQL error
     * @async
     */
    async addAlbum(userId, itemId) {

        try {

            const checkAlbum = await client.query(`SELECT * FROM ALBUM WHERE api_id=$1`, [itemId]);
            console.log(checkAlbum.rows[0]);

            if (checkAlbum.rows[0]) {
                this.id = checkAlbum.rows[0].id;
                console.log(checkAlbum.rows[0].id);
                const checkUserLikesAlbum = await client.query(`SELECT * FROM USER_LIKES_ALBUM WHERE (api_id, user_id)=($1, $2);`, [itemId, userId]);

                if (checkUserLikesAlbum.rows[0]) {
                    throw new Error('album déjà liké');
                }

            } else {

                const { rows } = await client.query('INSERT INTO ALBUM(name, genre, artist, year, url_image, api_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id', 
                [this.name, this.genre, this.artist, this.year, this.urlImage, itemId]);
                itemId = this.apiId;

            }

            await client.query('INSERT INTO USER_LIKES_ALBUM (api_id, user_id) VALUES ($1, $2)', [itemId, userId]);
            console.log('album ajouté à votre bibliotheque')
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
     * remove the Album with the given itemId from the user's dashboard
     * @param {number} userId 
     * @param {number} itemId 
     * @returns {string} albumName - the name of the album that has been removed from the dashboard
     * @throws {error} a potential SQL error
     * @static
     * @async
     */
    static async delete(userId, itemId) {

        try {
            const checkDelete = await client.query('SELECT "api_id" FROM USER_LIKES_ALBUM WHERE api_id=$1', [itemId]); 

            if(!checkDelete.rows[0]) {         
                throw new Error('album déjà supprimé');
                
            } else {

            await client.query('DELETE FROM USER_LIKES_ALBUM WHERE (api_id, user_id)=($1, $2)', [itemId, userId]);

            const album = await client.query('SELECT "name" FROM ALBUM WHERE api_id=$1', [itemId]);
            return album.rows[0].name;
            }

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Album;
