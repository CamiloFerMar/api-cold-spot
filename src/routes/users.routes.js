const express = require('express');
const { UserController } = require('../controllers/users.controller')

const router = express.Router();

module.exports.UserAPI = (app) => {
    router
        .get('/', UserController.getUsers)
        .get('/:id', UserController.getUserById)
        .get('/:id/products', UserController.getProductByUser)
        .post('/', UserController.createUser)
        .put('/:id', UserController.updateUser)
        .delete('/:id', UserController.deleteUser);
    
    app.use('/api/users', router)
}