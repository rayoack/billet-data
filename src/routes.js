const { Router } = require('express');

const routes = new Router();

const BilletController = require('./controllers/BilletController');

routes.post('/billet', BilletController.showBilletData);

module.exports = routes;