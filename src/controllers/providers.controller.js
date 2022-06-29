const { ProviderService } = require('../services/providers.services')

module.exports.ProviderController = {
    getProviders: async (req, res) => {
        const providers = await ProviderService.getAll()
        res.status(200).json(providers)
    },
    getProviderById: async (req, res) => {
        const { params: {id} } = req
        const provider = await ProviderService.getById(id);
        res.status(200).json(provider);
    },
    getProductByProvider: async (req, res) => {
        try {
            const { params: {id} } = req;
            const products = await ProviderService.getProductsByProvider(id);
            res.status(200).json({ message: products})
        } catch (error) {
            debug(error);
        }
    },
    createProvider: async (req, res) => {
        const { body } = req;
        const providerCreate = await ProviderService.create(body);
        res.status(200).json(providerCreate)
    },
    updateProvider: async (req, res) => {
        const { params: {id}, body } = req
        const providerUpdate = await ProviderService.update(id, body);
        res.status(200).json(providerUpdate ? 'Proveedor actualizado' : 'Proveedor no actualizado');
    },
    deleteProvider: async (req, res) => {
        const { params:{id} } = req;
        const providerDelete = await ProviderService.deletee(id);
        res.status(200).json(providerDelete ? 'Proveedor eliminado' : 'Proveedor no eliminado');
    } 
}