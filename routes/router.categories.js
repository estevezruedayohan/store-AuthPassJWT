const express = require('express');
const CategoriesService = require('../services/service.categories');
const validatorHandler = require('../middlewares/validator.Handler');
const {
  createCategorySchema,
  updateCategorySchema,
  readCategorySchema,
} = require('../schemas/schema.categories');

const router = express.Router();
const servicio = new CategoriesService();

// M+etodo para llamar todos las categorias

router.get('/', async (req, res) => {
  const rta = await servicio.findAll();
  res.json(rta);
});

// Método para traer una sola categoria por primarykey
router.get(
  '/:id',
  validatorHandler(readCategorySchema, 'params'),
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

// Método para CREAR una Categoria
router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
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

// Método para ACTUALIZAR una categoria
router.patch(
  '/:id',
  validatorHandler(readCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
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

// Método para BORRAR una categoria
router.delete(
  '/:id',
  validatorHandler(readCategorySchema, 'params'),
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
