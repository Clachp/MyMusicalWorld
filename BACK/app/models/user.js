const { response } = require('express');
const client = require('../database.js');
const bcrypt = require('bcrypt');

/**
 * An entity representing a user of the website
 * @typedef {object} User
 * @property {number} id
 * @property {string} mail
 * @property {string} lastname
 * @property {string} firstname
 * @property {string} pseudo
 * @property {string} password
 */

/**
 * A model representing a user of the website
 * @class User
 */
class User {

    /**
    * The User constructor
    * @param {object} obj a litteral object with properties copied into the instance
    */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Fetches a single user with the given id from the database, used to get the connected user profile infos
     * @param {number} id 
     * @returns {object<User>|null} User, null if no user found
     * @static
     * @async
     */
    static async findOne(id) {
        const { rows } = await client.query(`SELECT * FROM "USER" WHERE id=$1`, [id]);

        // Vérification : existe-t-il un user qui a cet id ?
        if (rows[0]) {
            const user = new User(rows[0]);
            delete user.password;
            return user;
        } else {
            console.log(`No user found for id ${id}`);
            return null;
        }

    }

    /**
     * Fetches a single user with the given mail and password from the database, used to log in a user
     * @param {string} mail user's mail
     * @param {string} password user's password
     * @returns {object} User
     * @throws {error} a potential SQL error, if the password does not match the mail or if no user with the given mail is found in the database
     * @static
     * @async
     */
    static async findByMail(mail, password) {

        try {
            const { rows } = await client.query(`SELECT * FROM "USER" WHERE mail=$1`, [mail]);

            if (rows[0]) {
                const isPwdValid = await bcrypt.compare(password, rows[0].password);

                if (isPwdValid === false) {

                    throw new Error('Email ou mot de passe incorrect.');

                } else {
                    const user = new User(rows[0]);
                    delete user.password
                    return user;
                }
            } else {

                throw new Error('Email ou mot de passe incorrect.');
            }
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }


    }

    /**
     * Add a User to the database, use to sign up a new user
     * @param {string} mail 
     * @param {string} password 
     * @returns {object} the newly created user
     * @throws {error} a potential SQL error, as if a user with the given mail already exists in the database
     * @static
     * @async
     */
    async addUser(mail, password, pseudo) {

        try {
            const checkMail = await client.query(`SELECT * FROM "USER" WHERE mail=$1`, [mail]);

            if (!checkMail.rows[0]) {
                
                const checkPseudo = await client.query(`SELECT * FROM "USER" WHERE pseudo=$1`, [pseudo]);

                if (!checkPseudo.rows[0]) {

                    const hashedPwd = await bcrypt.hash(password, 10);

                    const {rows} = await client.query('INSERT INTO "USER"(mail, lastname, firstname, pseudo, "password") VALUES($1, $2, $3, $4, $5) RETURNING id',
                        [this.mail,
                        this.lastname,
                        this.firstname,
                        this.pseudo,
                            hashedPwd]);

                    this.id = rows[0].id;
                    delete this.password;
                    delete this.password_confirmation;
                    return this;

                } else {
                    throw new Error('Ce pseudo est déjà pris.');
                }

            } else {
                throw new Error('Un utilisateur avec cet email existe déjà.');
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }

    /**
     * Update the User infos with the given token, hash the new password if a password is filled-out
     * @param {string} password 
     * @returns {object} the user with the updated infos
     * @throws {error} a potential SQL error
     * @async
     */
    async updateUser(password) {
        try {
            if (password) {
                const hashedPwd = await bcrypt.hash(password, 10);
                this.password = hashedPwd;

            }

            await client.query('SELECT * FROM update_user($1)', [this]);
            
            delete this.password;
            delete this.password_confirmation;
            return this;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }

    }

    /**
     * remove the user with the given id in the database
     * @param {number} id 
     * @throws {error} a potential SQL error
     * @static
     * @async
     */
    static async delete(id) {

        try {
            const { rows } = await client.query(`SELECT FROM "USER" WHERE id=$1`, [id]);

            if (rows[0] === undefined) {
                throw new Error(`il n'existe aucun compte avec cet id`);

            } else {

                await client.query('DELETE FROM USER_LIKES_ALBUM WHERE user_id=$1', [id]);
                await client.query('DELETE FROM USER_LIKES_ARTIST WHERE user_id=$1', [id]);
                await client.query('DELETE FROM USER_LIKES_TRACK WHERE user_id=$1', [id]);

                await client.query('DELETE FROM "USER" WHERE id=$1', [id]);
            }
        } catch (error) { 
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

}

module.exports = User;