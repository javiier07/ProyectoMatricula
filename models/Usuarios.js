const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    nombres: {
      type: String,
      required: true,
      trim: true
    },
    apellidos: {
      type: String,
      required: true,
      trim: true
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    numeroCuenta: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    contraseñaHash: {
      type: String,
      required: true
    },
    carreraCodigo: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    rol: {
      type: String,
      enum: ['admin', 'docente', 'alumno'],
      default: 'alumno'
    },
    asignaturasAprobadasCodigo: [
      {
        type: String,
        trim: true,
        uppercase: true
      }
    ],
    estado: {
      type: String,
      enum: ['activo', 'inactivo', 'suspendido'],
      default: 'activo'
    }
  },
  { timestamps: true }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;