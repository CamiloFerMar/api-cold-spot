const { BeerService } = require('../services/beers.services')

module.exports.BeerController = {
    getBeers: async (req, res) => {
        const beers = await BeerService.getAll()
        res.status(200).json(beers)
    },
    getBeerById: async (req, res) => {
        const { params: {id} } = req
        const beer = await BeerService.getById(id);
        res.status(200).json(beer);
    },
    createBeer: async (req, res) => {
        const { body } = req;
        const beerCreate = await BeerService.create(body);
        res.status(200).json({message: `Cerveza agregada ${beerCreate}`})
    },
    updateBeer: async (req, res) => {
        const { params: {id}, body } = req
        const beerUpdate = await BeerService.update(id, body);
        res.status(200).json({message: beerUpdate === 1 ? 'Cerveza actualizada' : 'Cerveza no actualizada'});
    },
    deleteBeer: async (req, res) => {
        const { params:{id} } = req;
        const beerDelete = await BeerService.deletee(id);
        res.status(200).json({message: beerDelete === 1 ? 'Cerveza eliminada' : 'Cerveza no eliminada'});
    } 
}