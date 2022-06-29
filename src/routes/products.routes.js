const express = require('express');
const { ProductController } = require('../controllers/products.controller')

const router = express.Router();

module.exports.ProductAPI = (app) => {
    router
        .get('/', ProductController.getProducts)
        .get('/sales', ProductController.getSalesProducts)
        .get('/sales/:id', ProductController.getSalesProduct)
        .get('/:id', ProductController.getProductById)
        .post('/', ProductController.createProduct)
        .put('/:id', ProductController.updateProduct)
        .delete('/:id', ProductController.deleteProduct);
    
    app.use('/api/products', router)
}