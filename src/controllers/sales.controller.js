const { SaleServices } = require('../services/sales.services');
const debug = require('debug')('app:customer-controller');

module.exports.SaleController = {
    getSales: async (req, res) => {
        try {
            const sales = await SaleServices.getAll();
            res.status(200).json(sales);
        } catch (error) {
            res.status(404).json(error.message);
        }
    },
    getSale: async (req, res) => {
        try {
            const { params: {id} } = req
            const sale = await SaleServices.getById(id);
            res.status(200).json(sale);
        } catch (error) {
            res.status(404).json(error.message);
        }
    },
    createSale: async (req, res) => {
        try {
            const { body } = req;
            if (body.product_id == "" || body.customer_id == "") return res.status(404).json({message: 'Informacion incompleta'})
            const createSale = await SaleServices.create(body);
            res.status(200).json({message: `Venta creada ${createSale}`});
        } catch (error) {
            res.status(404).json(error.message);
        }
    },
    deleteSale: async (req, res) => {
        try {
            const { params: {id} } = req;
            const deleteSale = await SaleServices.deletee(id);
            res.status(200).json({message: deleteSale > 0 ? 'Venta eliminanda' : 'Venta no eliminada'});
        } catch (error) {
            res.status(404).json(error.message);
        }
    }
}