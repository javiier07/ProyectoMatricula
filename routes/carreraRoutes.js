const express = require('express');

const router = express.Router();

const carreraController = require('../controllers/carreraController');

router.get('/', carreraController.obtenerCarreras);
router.post('/', carreraController.crearCarrera);
router.delete('/:codigo', carreraController.eliminarCarrera);
router.get('/:codigo', carreraController.obtenerCarreraPorCodigo);
router.put('/:codigo', carreraController.actualizarCarrera);

module.exports = router;