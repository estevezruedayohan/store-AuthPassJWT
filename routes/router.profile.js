const express = require('express');
const passport = require('passport');
const setupModels = require('../db/models');

const OrderService = require('./../services/service.orders');

const service = new OrderService();
const router = express.Router();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUserId(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
