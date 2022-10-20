const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ORDENES DE COMPRA');
});

module.exports = router;
