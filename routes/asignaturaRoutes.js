const express = require('express');

const router = express.Router();

const asignaturaController = require('../controllers/asignaturaController');

router.get('/', asignaturaController.obtenerAsignaturas);
router.post('/', asignaturaController.crearAsignatura);
router.delete('/:codigo', asignaturaController.eliminarAsignatura);
router.get('/:codigo', asignaturaController.obtenerAsignaturaPorCodigo);
router.put('/:codigo', asignaturaController.actualizarAsignatura);

module.exports = router;