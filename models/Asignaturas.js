const mongoose = require('mongoose');

const asignaturaSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    creditos: {
      type: Number,
      required: true,
      min: 1
    },
    descripcion: {
      type: String,
      trim: true
    },
    prerrequisitosCodigos: [
      {
        type: String,
        trim: true,
        uppercase: true
      }
    ],
    carreraCodigo: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    estado: {
      type: String,
      enum: ['activo', 'inactivo'],
      default: 'activo'
    }
  },
  { timestamps: true }
);

const Asignatura = mongoose.model('Asignatura', asignaturaSchema);
module.exports = Asignatura;