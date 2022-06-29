const { Database } = require('../database')
const { ObjectId } = require('mongodb')

const COLLECTION = 'beers';

const getAll = async () =>{
    const collection = await Database(COLLECTION);
    return collection.find({}).toArray();
}

const getById = async (id) =>{
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: ObjectId(id)});
}

const create = async (beer) => {
    const collection = await Database(COLLECTION);
    const productId = beer.product_id;
    delete beer.product_id;
    let result = await collection.insertOne({ product_id: ObjectId(productId),...beer});
    return result.insertedId;
}

const update = async (id, beer) => {
    const collection = await Database(COLLECTION);
    let result = false;
    result = await collection.updateOne({_id: ObjectId(id)}, {$set: {...beer}});
    return result.modifiedCount;
}

const deletee = async (id) => {
    const collection = await Database(COLLECTION);
    let result = false;
    result = await collection.deleteOne({_id: ObjectId(id)});
    return result.deletedCount;
}

module.exports.BeerService = {
    getAll,
    getById,
    create,
    update,
    deletee
} 