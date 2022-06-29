const { UserService } = require('../services/users.services');
const debug = require('debug')('app:user-controller');


module.exports.UserController = {
    getUsers: async (req, res) => {
        const users = await UserService.getAll()
        res.status(200).json(users)
    },
    getUserById: async (req, res) => {
        const { params: {id} } = req
        const user = await UserService.getById(id);
        res.status(200).json(user);
    },
    getProductByUser: async (req, res) => {
        try {
            const { params: {id} } = req;
            const products = await UserService.getProductsByUser(id);
            res.status(200).json({ message: products})
        } catch (error) {
            debug(error);
        }
    },
    createUser: async (req, res) => {
        const { body } = req;
        const userCreate = await UserService.create(body);
        res.status(200).json({message: `Usuario agregado ${userCreate}`})
    },
    updateUser: async (req, res) => {
        const { params: {id}, body } = req
        const userUpdate = await UserService.update(id, body);
        res.status(200).json({message: userUpdate === 1 ? 'Usuario actualizado' : 'Usuario no actualizado'});
    },
    deleteUser: async (req, res) => {
        const { params:{id} } = req;
        const userDelete = await UserService.deletee(id);
        res.status(200).json({message: userDelete === 1 ? 'Usuario eliminado' : 'Usuario no eliminado'});
    } 
}