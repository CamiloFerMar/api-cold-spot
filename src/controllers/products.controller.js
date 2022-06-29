const { ProductService } = require('../services/products.services')
const debug = require('debug')('app:product-controller');

module.exports.ProductController = {
    getProducts: async (req, res) => {
        const products = await ProductService.getAll()
        res.status(200).json(products)
    },
    getProductById: async (req, res) => {
        const { params: {id} } = req
        const product = await ProductService.getById(id);
        res.status(200).json(product);
    },
    getSalesProducts: async (req, res) => {
        try {
            const salesProducts = await ProductService.getSales();
            res.status(200).json(salesProducts);
        } catch (error) {
            res.status(404).json(error.message);
        }
    },
    getSalesProduct: async (req, res) => {
        try {
            const { params: {id} } = req
            const salesProduct = await ProductService.getSalesById(id);
            res.status(200).json(salesProduct);
        } catch (error) {
            res.status(404).json(error.message);
        }
    },
    createProduct: async (req, res) => {
        const { params: {tipo} , body } = req;
        const productCreate = await ProductService.create(body);
        res.status(200).json({message: `Producto agregado ${productCreate}`})
    },
    updateProduct: async (req, res) => {
        const { params: {id}, body } = req
        const productUpdate = await ProductService.update(id, body);
        res.status(200).json({message: productUpdate === 1 ? 'Producto actualizado' : 'Producto no actualizado'});
    },
    deleteProduct: async (req, res) => {
        const { params:{id} } = req;
        const productDelete = await ProductService.deletee(id);
        res.status(200).json({message: productDelete === 1 ? 'Producto eliminado' : 'Producto no eliminado'});
    } 
}