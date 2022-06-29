const { CustomerController } = require('../controllers/customers.controller')
const express = require('express');
const router = express.Router();

module.exports.CustomerAPI = (app) => {
    router
        .get('/', CustomerController.getCustomers)
        .get('/sales', CustomerController.getSalesCustomers)
        .get('/sales/:id', CustomerController.getSalesCustomer)
        .get('/products/', CustomerController.getProductsCustomers)
        .get('/products/:id', CustomerController.getProductsCustomer)
        .get('/:id', CustomerController.getCustomer)
        .post('/', CustomerController.createCustomer)
        .put('/:id', CustomerController.updateCustomer)
        .delete('/:id', CustomerController.deleteCustomer)
    app.use('/api/customers', router)
}  