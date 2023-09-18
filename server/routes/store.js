const StoreController = require('../controllers/store');

module.exports = app => {
    app.get('/api/stores', StoreController.findAll);
    app.post('/api/stores', StoreController.createStore);
    app.get('/api/stores/:id', StoreController.findOneStore);
    app.patch('/api/stores/:id', StoreController.updateStore);
    app.delete('/api/stores/:id', StoreController.deleteStore);
}