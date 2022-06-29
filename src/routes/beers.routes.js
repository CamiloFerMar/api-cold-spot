const express = require('express');
const { BeerController } = require('../controllers/beers.controller')

const router = express.Router();

module.exports.BeerAPI = (app) => {
    router
        .get('/', BeerController.getBeers)
        .get('/:id', BeerController.getBeerById)
        .post('/', BeerController.createBeer)
        .put('/:id', BeerController.updateBeer)
        .delete('/:id', BeerController.deleteBeer);
    
    app.use('/api/Beers', router)
}