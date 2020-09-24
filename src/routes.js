const { Router } = require('express');

const routes = new Router();

routes.get('/', async (req, res) => {
  return res.send('Running...')
})

module.exports = routes;