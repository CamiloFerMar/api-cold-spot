const { Database } = require('../database');
const { ObjectId } = require('mongodb');

const COLLECTION = 'sales';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: ObjectId(id)});
}

const create = async (sale) => {
    const collection = await Database(COLLECTION);
    const { product_id, customer_id, amount } = sale;
    const saleCreate = await collection.insertOne({
        product_id: ObjectId(product_id), 
        customer_id: ObjectId(customer_id), 
        amount: amount,
        added_date: new Date()
    });
    return saleCreate.insertedId;
}

const deletee = async (id) => {
    const collection = await Database(COLLECTION);
    const saleDelete = await collection.deleteOne({_id: ObjectId(id)});
    return saleDelete.deletedCount;
}


module.exports.SaleServices = {
    getAll,
    getById,
    create,
    deletee
}

