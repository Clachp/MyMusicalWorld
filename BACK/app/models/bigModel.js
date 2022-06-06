const client = require('../database');

class Model {

    static tableName = null;

    async add (userId, itemId) {

    const tableName = this.constructor.tableName;
    console.log(tableName);
    userId = '';

        // on déclare 3 tableaux pour stocker le nom des champs, la valeur des champs et leur position dans la requête

        const fieldNames = [];
        const fieldValues = [];
        const fieldPostions = []
        let count = 1;

        for (const propName in this) {
            fieldNames.push(`"${propName}"`);
            fieldValues.push(this[propName]);
            fieldPostions.push(`$${count}`);
      
            count++;
        }

    try {

        const check = await client.query(`SELECT * FROM ${tableName} WHERE api_id=$1`, [itemId]);
        console.log(check.rows[0]);

        if (check.rows[0]) {
            this.id = check.rows[0].id;
            const checkUserLikes = await client.query(`SELECT * FROM USER_LIKES_${tableName} WHERE (api_id, user_id)=($1, $2);`, [itemId, userId]);

            if(checkUserLikes.rows[0]) {
                console.log('album deja liké');
                throw new Error(`${tableName.toLowerCase()} déjà liké`);
            } 
                              
        } else {

            const {rows} = await client.query(`INSERT INTO ${tableName}(${fieldNames.join(', ')}) VALUES(${fieldPostions.join(', ')}) RETURNING id`, fieldValues);
            itemId = this.apiId;

        }
        await client.query(`INSERT INTO USER_LIKES_${tableName} (api_id, user_id) VALUES ($1, $2)`, [itemId, userId]);
        return this;


    } catch (error) {

        console.log('error du model');
        if (error.detail) {
            throw new Error(error.detail);
        }
        throw new Error(error.message);
    }

}

static async delete (userId, itemId) {

    const tableName = this.tableName;
    console.log(tableName); // undefined  : comment appeler une instance de classe dans une méthode statique ? 

    try {
        const checkDelete = await client.query(`SELECT "api_id" FROM USER_LIKES_${tableName} WHERE api_id=$1`, [itemId]); 

        if(!checkDelete.rows[0]) {         
            throw new Error(`${tableName} déjà supprimé`);
            
        } else {

        await client.query(`DELETE FROM USER_LIKES_${tableName} WHERE (api_id, user_id)=($1, $2)`, [itemId, userId]);

        const item = await client.query(`SELECT "name" FROM ${tableName} WHERE api_id=$1`, [itemId]);
        return item.rows[0].name;
        }

    } catch (error) {
        if (error.detail) {
            throw new Error(error.detail);
        }
        throw error;
    }
    }

    constructor() {
        Model.delete(userId, itemId);
    }
}

module.exports = Model; 
