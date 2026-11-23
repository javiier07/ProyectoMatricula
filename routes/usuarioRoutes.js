const express = require('express');

const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.obtenerUsuarios);
router.get('/:correo', usuarioController.obtenerUsuarioPorCorreo);
router.post('/', usuarioController.crearUsuario);
router.delete('/:correo', usuarioController.eliminarUsuario);
router.put('/:correo', usuarioController.actualizarUsuario);

module.exports = router;