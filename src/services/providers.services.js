const { Database } = require('../database')
const { ObjectId } = require('mongodb')

const COLLECTION = 'providers';

const getAll = async () =>{
    const collection = await Database(COLLECTION);
    return collection.find({}).toArray();
}

const getById = async (id) =>{
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: ObjectId(id)});
}

const getProductsByProvider = async (id) => {
    const collection = await Database(COLLECTION);
    const pipeline = [{
        $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'provider_id',
            as: 'products'
        }},{
        $match: {
            _id: ObjectId(id)
        }}
    ];
    
    const result = await collection.aggregate(pipeline).toArray();
    return result;
}

const create = async (provider) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne({...provider, added_date: new Date()});
    return result.insertedId;
}

const update = async (id, provider) => {
    const collection = await Database(COLLECTION);
    let result = false;
    result = await collection.updateOne({_id: ObjectId(id)}, {$set: {...provider}});
    return result.acknowledged;
}

const deletee = async (id) => {
    const collection = await Database(COLLECTION);
    let result = false;
    result = await collection.deleteOne({_id: ObjectId(id)});
    return result.acknowledged;
}

module.exports.ProviderService = {
    getAll,
    getById,
    getProductsByProvider,
    create,
    update,
    deletee
} 