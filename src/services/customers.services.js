const { Database } = require('../database')
const { ObjectId } = require('mongodb')
const { ProductService } = require('./products.services')

const COLLECTION = "customers";

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: ObjectId(id) })
}

const getSales = async () => {
    const collection = await Database(COLLECTION);
    const pipeline = [{
        $lookup: {
            from: 'sales',
            localField: '_id',
            foreignField: 'customer_id',
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
            foreignField: 'customer_id',
            as: 'sales'
        }},{
        $match: {
            _id: ObjectId(id)
        }}
    ];

    const sales = await collection.aggregate(pipeline).toArray();
    return sales;
}

const getProducts = async (customers) => {
    //Buscamos el arreglo ventas de cada cliente
    let salesFound = customers.map(customer => {
        return {
            sales: customer.sales
        }
    });

    //Obteniendo los id del producto de cada venta de cada cliente
    let customerProductId = salesFound.map(sales => {
        let productId = [];
        for (const sale of sales.sales) {
            let id = sale.product_id.toString();
            productId.push(id);
        }
        return {
            id: productId
        }
    });

    console.log(customerProductId[0]);
    //Agregando productos a cada cliente
    for (let i = 0; i < customers.length; i++) {
        //Obteniendo productos por cada id registrado en la venta
        let products = await getProductsCustomer(customerProductId[i].id);
        //Sustituyendo arreglo ventas, por el arreglo de productos
        delete customers[i].sales
        customers[i].products = products
    }

    return customers;
}

const getProductsById = async (aggregate) => {
    //Buscamos el arreglo ventas
    let salesFound = aggregate[0].sales;

    //Obteniendo los id del producto de cada venta
    let productId = salesFound.map(sale => {
        let id = sale.product_id.toString()
        return {
            id
        }
    })

    let products = await getProductsCustomer(productId);
    
    //Sustituyendo arreglo ventas, por el arreglo de productos
    delete aggregate[0].sales
    aggregate[0].products = products;

    const newAggregate = aggregate[0];
    
    return newAggregate;
}

const getProductsCustomer = async (productId) => {
    //Obteniendo productos por cada id registrado en la venta
    let products = []
    for (const id of productId) {
        let product = await ProductService.getById(id);
        products.push(product);
    }
    return products;
}

const create = async (customer) => {
    const collection = await Database(COLLECTION);
    const customerCreate = await collection.insertOne({...customer});
    return customerCreate.insertedId;
}

const update = async (id, customer) => {
    const collection = await Database(COLLECTION);
    const customerUpdate = await collection.updateOne({_id: ObjectId(id)}, {$set: {...customer}});
    return customerUpdate.modifiedCount;
}

const deletee = async (id) => {
    const collection = await Database(COLLECTION);
    const customerDelete = await collection.deleteOne({_id: ObjectId(id)});
    return customerDelete.deletedCount;
}

module.exports.CustomerServices = {
    getAll,
    getById,
    getSales,
    getSalesById,
    getProducts,
    getProductsById,
    create,
    update,
    deletee
}