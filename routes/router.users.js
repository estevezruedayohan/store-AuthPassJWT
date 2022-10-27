const express = require('express');
const UserService = require('../services/service.users');
const validatorHandler = require('../middlewares/validator.Handler');
const {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
  readUserSchema,
} = require('../schemas/schema.users');

const router = express.Router();
const servicio = new UserService();

// M+etodo para llamar todos los usuarios

router.get('/', async (req, res) => {
  const rta = await servicio.findAll();
  res.json(rta);
});

// Método para traer un solo usuario
router.get(
  '/:id',
  validatorHandler(readUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await servicio.findOne(id);
      console.log(rta);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
