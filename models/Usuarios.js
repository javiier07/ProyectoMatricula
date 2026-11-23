const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  numeroCuenta: {
    type: String,
    required: true,
    unique: true
  },
  contraseñaHash: {
    type: String,
    required: true
  },
  carreraCodigo: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'docente', 'alumno'],
    default: 'alumno'
  },
  asignaturasAprobadasCodigo: [{
    type: String,
    default: []
  }],
  estado: {
    type: String,
    default: 'activo'
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;