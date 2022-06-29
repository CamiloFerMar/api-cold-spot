const debug = require('debug')('app:module-database');
const { MongoClient } = require('mongodb')


var connection = null;


module.exports.Database = (collection) => new Promise( async (resolve, reject) => {
    try {
        if (!connection) {
            const client = new MongoClient(process.env.MONGO_URI);
            connection = await client.connect();
            debug('New connection whith mongo atlas')
        }
        debug('Using connection')
        const db = await connection.db(process.env.MONGO_DB_NAME)
        resolve(db.collection(collection))
        
    } catch (error) {
        reject(error)
        debug(error);
    } 
})