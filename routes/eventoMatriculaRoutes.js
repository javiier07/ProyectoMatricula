const express = require('express');
const router = express.Router();
const eventoMatriculaController = require('../controllers/eventoMatriculaController');

router.get('/', eventoMatriculaController.obtenerEventosMatricula);
router.get('/:codigoEvento', eventoMatriculaController.obtenerEventoMatriculaPorCodigo);
router.post('/', eventoMatriculaController.crearEventoMatricula);
router.put('/:codigoEvento', eventoMatriculaController.actualizarEventoMatricula);
router.delete('/:codigoEvento', eventoMatriculaController.eliminarEventoMatricula);

module.exports = router;