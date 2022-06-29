const { CustomerServices } = require('../services/customers.services');
const debug = require('debug')('app:customer-controller');

module.exports.CustomerController = {
    getCustomers: async (req, res) => {
        try {
            const customers = await CustomerServices.getAll();
            res.status(200).json(customers)
        } catch (error) {
            res.status(404).json(error.message)
            debug(error)
        }
    },
    getCustomer: async (req, res) => {
        try {
            const { params: {id} } = req
            const customer = await CustomerServices.getById(id);
            res.status(200).json(customer);
        } catch (error) {
            res.status(404).json(error.message)
            debug(error)
        }
    },
    getSalesCustomers: async (req, res) => {
        try {
            const salesCustomers = await CustomerServices.getSales();
            CustomerServices.getProductsCustomers(salesCustomers);
            res.status(200).json(salesCustomers);
        } catch (error) {
            res.status(404).json(error.message);
        }
    },
    getSalesCustomer: async (req, res) => {
        try {
            const { params: {id} } = req
            const salesCustomer = await CustomerServices.getSalesById(id);
            res.status(200).json(salesCustomer);
        } catch (error) {
            res.status(404).json(error.message);
        }
    },
    getProductsCustomers: async (req, res) => {
        try {
            const salesCustomers = await CustomerServices.getSales();
            const productsCustomers = await CustomerServices.getProducts(salesCustomers);
            res.status(200).json(productsCustomers);
        } catch (error) {
            res.status(404).json(error.message);
            debug(error)
        }
    },
    getProductsCustomer: async (req, res) => {
        try {
            const { params: {id} } = req
            const salesCustomer = await CustomerServices.getSalesById(id);
            const productsCustomer = await CustomerServices.getProductsById(salesCustomer);
            res.status(200).json(productsCustomer);
        } catch (error) {
            res.status(404).json(error.message);
            debug(error)
        }
    },
    createCustomer: async (req, res) => {
        try {
            const { body } = req;
            const customerCreate = await CustomerServices.create(body);
            res.status(200).json({message: `Cliente creado ${customerCreate}`});
        } catch (error) {
            res.status(404).json(error.message);
            debug(error)
        }
    },
    updateCustomer: async (req, res) => {
        try {
            const { params: {id}, body } = req
            const customerUpdate = await CustomerServices.update(id, body);
            res.status(200).json({message: customerUpdate === 1 ? 'Cliente actualizado' : 'Cliente no actualizado'})
        } catch (error) {
            res.status(404).json(error.message)
            debug(error)
        }
    },
    deleteCustomer: async (req, res) => {
        try {
            const { params: {id} } = req;
            const customerDelete = await CustomerServices.deletee(id);
            res.status(200).json({message: customerDelete === 1 ? 'Cliente eliminado' : 'Cliente no eliminado'})
        } catch (error) {
            res.status(404).json(error.message)
            debug(error)
        }
    }
}