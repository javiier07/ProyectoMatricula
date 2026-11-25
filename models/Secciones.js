const mongoose = require('mongoose');

const seccionSchema = new mongoose.Schema(
  {
    asignaturaCodigo: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    periodoNombre: {
      type: String,
      required: true,
      trim: true
    },
    codigoSeccion: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    nombreDocente: {
      type: String,
      required: true,
      trim: true
    },
    horario: [
      {
        dia: {
          type: String,
          required: true,
          trim: true
        },
        horaInicio: {
          type: String,
          required: true,
          trim: true
        },
        horaFin: {
          type: String,
          required: true,
          trim: true
        }
      }
    ],
    aula: {
      type: String,
      required: true,
      trim: true
    },
    cupo: {
      type: Number,
      required: true,
      min: 1
    },
    cantidadMatriculados: {
      type: Number,
      default: 0,
      min: 0
    },
    estado: {
      type: String,
      enum: ['activo', 'inactivo', 'cancelado'],
      default: 'activo'
    }
  },
  { timestamps: true }
);

seccionSchema.index(
  { asignaturaCodigo: 1, periodoNombre: 1, codigoSeccion: 1 },
  { unique: true }
);

const Seccion = mongoose.model('Seccion', seccionSchema);
module.exports = Seccion;