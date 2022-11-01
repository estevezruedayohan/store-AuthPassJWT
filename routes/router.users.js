const express = require('express');
const UserService = require('../services/service.users');
const validatorHandler = require('../middlewares/validator.Handler');
const {
  createUserSchema,
  updateUserSchema,
  readUserByIdSchema,
  readUserByEmailSchema,
} = require('../schemas/schema.users');

const router = express.Router();
const servicio = new UserService();

// M+etodo para llamar todos los usuarios

router.get('/', async (req, res) => {
  const rta = await servicio.findAll();
  res.json(rta);
});

// Método para traer un solo usuario por primarykey
router.get(
  '/:id',
  validatorHandler(readUserByIdSchema, 'params'),
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

// Método para traer un solo usuario por email
router.get(
  // pendiente por implementar separar por un router
  '/:email',
  validatorHandler(readUserByEmailSchema, 'params'),
  async (req, res, next) => {
    try {
      const { email } = req.params;
      const rta = await servicio.findByEmail(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// Método para CREAR un usuario
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
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

// Método para ACTUALIZAR un usuario
router.patch(
  '/:id',
  validatorHandler(readUserByIdSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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

// Método para BORRAR un usuario
router.delete(
  '/:id',
  validatorHandler(readUserByIdSchema, 'params'),
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
