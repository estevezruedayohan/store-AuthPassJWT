const express = require('express');
const routerProducts = require('./router.products');
const routerUsers = require('./router.users');
const routerOrders = require('./router.orders');
const routerHome = require('./router.home');
const routerCustomers = require('./router.customers');
const routerCategories = require('./router.categories');
const routerDetails = require('./router.details');
const routerAuth = require('./router.login');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1/', router); // genera el parámetro inicial a partir del cual se hará el routing
  router.use('/', routerHome);
  router.use('/products', routerProducts);
  router.use('/users', routerUsers);
  router.use('/orders', routerOrders);
  router.use('/customers', routerCustomers);
  router.use('/categories', routerCategories);
  router.use('/details', routerDetails);
  router.use('/auth', routerAuth);
}

module.exports = routerApi;
