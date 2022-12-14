const express = require('express');
const passport = require('passport');
const OrderService = require('../services/service.orders');
const validatorHandler = require('../middlewares/validator.Handler');
const {
  createOrderSchema,
  updateOrderSchema,
  readOrderSchema,
} = require('../schemas/schema.orders');
const CustomerService = require('../services/service.customers');

const router = express.Router();
const servicio = new OrderService();

const serviceCustomer = new CustomerService();

// M+etodo para llamar todos las ordenes

router.get('/', async (req, res, next) => {
  try {
    const rta = await servicio.findAll();
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

// Método para traer un solo orden por primarykey
router.get(
  '/:id',
  validatorHandler(readOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await servicio.findByPk(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// Método para CREAR una orden con Token
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const customerId = await serviceCustomer.findByUserId(user.sub);
      const orders = await servicio.create({ customerId });
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

// Método para ACTUALIZAR una orden
router.patch(
  '/:id',
  validatorHandler(readOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const rta = await servicio.update(id, changes);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// Método para BORRAR una orden
router.delete(
  '/:id',
  validatorHandler(readOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await servicio.delete(id);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
