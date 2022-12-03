const express = require('express');
const OrderService = require('../services/service.orders');
const validatorHandler = require('../middlewares/validator.Handler');
const {
  createOrderSchema,
  updateOrderSchema,
  readOrderSchema,
} = require('../schemas/schema.orders');

const router = express.Router();
const servicio = new OrderService();

// M+etodo para llamar todos las ordenes

router.get('/', async (req, res) => {
  const rta = await servicio.findAll();
  res.json(rta);
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

// Método para CREAR una orden
router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await servicio.create(body);
      res.status(201).json(rta);
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
