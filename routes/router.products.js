const express = require('express');
const ProductService = require('../services/service.products');
const validatorHandler = require('../middlewares/validator.Handler');
const {
  createProductSchema,
  updateProductSchema,
  readProductSchema,
} = require('../schemas/schema.products');

const router = express.Router();
const servicio = new ProductService();

// Método para llamar todos los productos
router.get('/', async (req, res, next) => {
  try {
    const rta = await servicio.findAll();
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

// Método para llamar un solo producto
router.get(
  '/:id',
  validatorHandler(readProductSchema, 'params'),
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

// Método para CREAR un producto
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
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

// Método para ACTUALIZAR un producto
router.patch(
  '/:id',
  validatorHandler(readProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const changes = req.body;
      const { id } = req.params;
      const rta = await servicio.update(id, changes);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// Método para BORRAR un producto
router.delete(
  '/:id',
  validatorHandler(readProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await servicio.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
