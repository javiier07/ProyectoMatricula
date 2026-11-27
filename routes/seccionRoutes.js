const express = require('express');
const router = express.Router();
const seccionController = require('../controllers/seccionController');

router.get('/', seccionController.obtenerSecciones);
router.get('/:periodoNombre/:asignaturaCodigo/:codigoSeccion', seccionController.obtenerSeccion);
router.post('/', seccionController.crearSeccion);
router.put('/:periodoNombre/:asignaturaCodigo/:codigoSeccion', seccionController.actualizarSeccion);
router.delete('/:periodoNombre/:asignaturaCodigo/:codigoSeccion', seccionController.eliminarSeccion);

module.exports = router;