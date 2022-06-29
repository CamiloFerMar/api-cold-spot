const express = require('express');
const { ProviderController } = require('../controllers/providers.controller')

const router = express.Router();

module.exports.ProviderAPI = (app) => {
    router
        .get('/', ProviderController.getProviders)
        .get('/:id', ProviderController.getProviderById)
        .get('/:id/products', ProviderController.getProductByProvider)
        .post('/', ProviderController.createProvider)
        .put('/:id', ProviderController.updateProvider)
        .delete('/:id', ProviderController.deleteProvider);
    
    app.use('/api/providers', router)
}