const express = require('express');
const storeA = require('../routes/datastoreA');
const storeB = require('../routes/datastoreB');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/datastoreA/products', storeA);
  app.use('/api/datastoreB/products', storeB);

}