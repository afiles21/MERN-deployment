const Store = require('../models/Store');

module.exports = {

    findAll: (req, res) => {
        Store.find()
            .then( allStores => res.json(allStores))
            .catch( err => res.status(400).json(err))
    },

    findOneStore: (req, res) => {
        Store.findById(req.params.id)
            .then( oneStore => res.json(oneStore))
            .catch( err => res.status(400).json(err))
    },

    createStore: (req, res) => {
        Store.create(req.body)
            .then( newStore => res.json(newStore))
            .catch( err => res.status(400).json(err))
    },

    updateStore: (req, res) => {
        Store.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            .then( updatedStore => res.json(updatedStore))
            .catch( err => res.status(400).json(err))
    },

    deleteStore: (req, res) => {
        Store.findByIdAndDelete(req.params.id)
            .then(deletedStore => res.json(deletedStore))
            .catch( err => res.status(400).json(err))
    }
}