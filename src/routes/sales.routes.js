const express = require('express');
const router = express.Router();
const { SaleController } = require('../controllers/sales.controller')

module.exports.SaleAPI = (app) => {
    router
        .get('/', SaleController.getSales)
        .get('/:id', SaleController.getSale)
        .post('/', SaleController.createSale)
        .delete('/:id', SaleController.deleteSale);
    
    app.use('/api/sales', router);
}