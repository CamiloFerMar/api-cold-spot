const { Database } = require('../database')
const { ObjectId } = require('mongodb')

const COLLECTION = 'users';

const getAll = async () =>{
    const collection = await Database(COLLECTION);
    return collection.find({}).toArray();
}

const getById = async (id) =>{
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: ObjectId(id)});
}

const getProductsByUser = async (id) => {
    const collection = await Database(COLLECTION);
    const pipeline = [{
        $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'user_id',
            as: 'products'
        }},{
        $match: {
            _id: ObjectId(id)
        }}
    ];
    
    const result = await collection.aggregate(pipeline).toArray();
    return result;
}

const create = async (user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne({...user, added_date: new Date()});
    return result.insertedId;
}

const update = async (id, user) => {
    const collection = await Database(COLLECTION);
    let result = false;
    result = await collection.updateOne({_id: ObjectId(id)}, {$set: {...user}});
    return result.modifiedCount;
}

const deletee = async (id) => {
    const collection = await Database(COLLECTION);
    let result = false;
    result = await collection.deleteOne({_id: ObjectId(id)});
    return result.deletedCount;
}

module.exports.UserService = {
    getAll,
    getById,
    getProductsByUser,
    create,
    update,
    deletee
} 