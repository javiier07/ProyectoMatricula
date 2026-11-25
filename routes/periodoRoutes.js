const express = require('express');

const router = express.Router();

const periodoController = require('../controllers/periodoController');

router.get('/', periodoController.obtenerPeriodos);
router.get('/:nombre', periodoController.obtenerPeriodoPorNombre);
router.post('/', periodoController.crearPeriodo);
router.put('/:nombre', periodoController.actualizarPeriodo);
router.delete('/:nombre', periodoController.eliminarPeriodo);

module.exports = router;