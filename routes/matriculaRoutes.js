const express = require('express');
const router = express.Router();
const matriculaController = require('../controllers/matriculaController');

router.get('/', matriculaController.obtenerMatriculas);
router.get('/:codigoMatricula', matriculaController.obtenerMatriculaPorCodigo);
router.post('/', matriculaController.crearMatricula);
router.put('/:codigoMatricula', matriculaController.actualizarMatricula);
router.delete('/:codigoMatricula', matriculaController.eliminarMatricula);

module.exports = router;