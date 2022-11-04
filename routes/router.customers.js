const express = require('express');
const CustomerService = require('../services/service.customers');
const validatorHandler = require('../middlewares/validator.Handler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  readCustomerByIdSchema,
} = require('../schemas/schema.customers');

const router = express.Router();
const servicio = new CustomerService();

// M+etodo para llamar todos los clientes

router.get('/', async (req, res) => {
  const rta = await servicio.findAll();
  res.json(rta);
});

// Método para traer un solo cliente por primarykey
router.get(
  '/:id',
  validatorHandler(readCustomerByIdSchema, 'params'),
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

// Método para CREAR un cliente
router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
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

// Método para ACTUALIZAR un cliente
router.patch(
  '/:id',
  validatorHandler(readCustomerByIdSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
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

// Método para BORRAR un cliente
router.delete(
  '/:id',
  validatorHandler(readCustomerByIdSchema, 'params'),
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
