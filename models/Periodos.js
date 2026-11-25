const mongoose = require('mongoose');

const periodoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    fechaInicio: {
      type: Date,
      required: true
    },
    inicioMatricula: {
      type: Date,
      required: true
    },
    finMatricula: {
      type: Date,
      required: true
    },
    fechaLimiteCancelacion: {
      type: Date,
      required: true
    },
    estado: {
      type: String,
      enum: ['abierto', 'cerrado'],
      default: 'abierto'
    }
  },
  { timestamps: true }
);

const Periodo = mongoose.model('Periodo', periodoSchema);
module.exports = Periodo;