const { Database } = require('../database')
const { ObjectId } = require('mongodb')

const COLLECTION = 'products';

const getAll = async () =>{
    const collection = await Database(COLLECTION);
    return collection.find({}).toArray();
}

const getById = async (id) =>{
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: ObjectId(id)});
}

const getSales = async () => {
    const collection = await Database(COLLECTION);
    const pipeline = [{
        $lookup: {
            from: 'sales',
            localField: '_id',
            foreignField: 'product_id',
            as: 'sales'
        }}
    ];

    const sales = await collection.aggregate(pipeline).toArray();
    return sales;
} 

const getSalesById = async (id) => {
    const collection = await Database(COLLECTION);
    const pipeline = [{
        $lookup: {
            from: 'sales',
            localField: '_id',
            foreignField: 'product_id',
            as: 'sales'
        }},{
        $match: {
            _id: ObjectId(id)
        }}
    ];

    const sales = await collection.aggregate(pipeline).toArray();
    return sales;
}

const create = async (product) => {
    const userId = product.user_id;
    const providerId = product.provider_id;
    delete product.user_id;
    delete product.provider_id;
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne({ 
        user_id: ObjectId(userId), 
        provider_id: ObjectId(providerId),
        ...product, 
        added_date: new Date()
    });
    return result.insertedId;
}

const update = async (id, product) => {
    const collection = await Database(COLLECTION);
    let result = false;
    result = await collection.updateOne({_id: ObjectId(id)}, {$set: {...product}});
    return result.modifiedCount;
}

const deletee = async (id) => {
    const collection = await Database(COLLECTION);
    let result = false;
    result = await collection.deleteOne({_id: ObjectId(id)});
    return result.deletedCount;
}

module.exports.ProductService = {
    getAll,
    getById,
    getSales,
    getSalesById,
    create,
    update,
    deletee
} 