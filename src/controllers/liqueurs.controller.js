const { LiqueurService } = require('../services/liqueurs.services')

module.exports.LiqueurController = {
    getLiqueurs: async (req, res) => {
        const liqueurs = await LiqueurService.getAll()
        res.status(200).json(liqueurs)
    },
    getLiqueurById: async (req, res) => {
        const { params: {id} } = req
        const liqueur = await LiqueurService.getById(id);
        res.status(200).json(liqueur);
    },
    createLiqueur: async (req, res) => {
        const { body } = req;
        const liqueurCreate = await LiqueurService.create(body);
        res.status(200).json({message: `Licor agregado ${liqueurCreate}`})
    },
    updateLiqueur: async (req, res) => {
        const { params: {id}, body } = req
        const liqueurUpdate = await LiqueurService.update(id, body);
        res.status(200).json({message: liqueurUpdate === 1 ? 'Licor actualizado' : 'Licor no actualizado'});
    },
    deleteLiqueur: async (req, res) => {
        const { params:{id} } = req;
        const liqueurDelete = await LiqueurService.deletee(id);
        res.status(200).json({message: liqueurDelete === 1 ? 'Licor eliminado' : 'Licor no eliminado'});
    } 
}