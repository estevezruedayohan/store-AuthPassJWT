const express = require('express');
const DetailsService = require('../services/service.details');
const validatorHandler = require('../middlewares/validator.Handler');
const {
  createItemSchema,
  updateItemSchema,
  DeleteItemSchema,
} = require('../schemas/schema.details');

const router = express.Router();
const servicio = new DetailsService();

// M+etodo para llamar todos las detalles

// router.get('/', async (req, res) => {
//   const rta = await servicio.findAll();
//   res.json(rta);
// });

// Método para traer un solo orden por primarykey
// router.get(
//   '/:id',
//   validatorHandler(readOrderSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const rta = await servicio.findByPk(id);
//       res.json(rta);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// Método para CREAR un item
router.post(
  '/add-item',
  validatorHandler(createItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await servicio.addItem(body);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// Método para ACTUALIZAR un item
// router.patch(
//   '/:id',
//   validatorHandler(readOrderSchema, 'params'),
//   validatorHandler(updateOrderSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const changes = req.body;
//       const rta = await servicio.update(id, changes);
//       res.status(201).json(rta);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// Método para BORRAR un item
// router.delete(
//   '/:id',
//   validatorHandler(readOrderSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const rta = await servicio.delete(id);
//       res.status(201).json(rta);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;
