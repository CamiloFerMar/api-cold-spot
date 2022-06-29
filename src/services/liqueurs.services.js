const { Database } = require('../database')
const { ObjectId } = require('mongodb')

const COLLECTION = 'liqueurs';

const getAll = async () =>{
    const collection = await Database(COLLECTION);
    return collection.find({}).toArray();
}

const getById = async (id) =>{
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: ObjectId(id)});
}

const create = async (liqueur) => {
    const collection = await Database(COLLECTION);
    const productId = liqueur.product_id;
    delete liqueur.product_id;
    let result = await collection.insertOne({ product_id: ObjectId(productId) , ...liqueur});
    return result.insertedId;
}

const update = async (id, liqueur) => {
    const collection = await Database(COLLECTION);
    let result = await collection.updateOne({_id: ObjectId(id)}, {$set: {...liqueur}});
    return result.modifiedCount;
}

const deletee = async (id) => {
    const collection = await Database(COLLECTION);
    let result = await collection.deleteOne({_id: ObjectId(id)});
    return result.deletedCount;
}

module.exports.LiqueurService = {
    getAll,
    getById,
    create,
    update,
    deletee
} 