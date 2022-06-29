const express = require('express');
const { LiqueurController } = require('../controllers/liqueurs.controller')

const router = express.Router();

module.exports.LiqueurAPI = (app) => {
    router
        .get('/', LiqueurController.getLiqueurs)
        .get('/:id', LiqueurController.getLiqueurById)
        .post('/', LiqueurController.createLiqueur)
        .put('/:id', LiqueurController.updateLiqueur)
        .delete('/:id', LiqueurController.deleteLiqueur);
    
    app.use('/api/Liqueurs', router)
}