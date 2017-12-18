'use strict';
const ApiController = require('../controllers/ApiController');

module.exports = (app, connection) => {
  app.route('/')
      .get(ApiController.main);

  app.get('/api/all', (req, res) => {
    return ApiController.all(req, res, connection)
  });

  app.get('/api/item/:itemName', (req, res) => {
    return ApiController.item(req, res, connection)
  });

  app.route('*')
      .get(ApiController.pageNotFound);
};