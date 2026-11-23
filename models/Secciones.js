const mongoose = require('mongoose');

const seccionSchema = new mongoose.Schema({
  asignaturaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asignatura',
    required: true
  },
  periodoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Periodo',
    required: true
  },
  codigoSeccion: {
    type: String,
    required: true
  },
  nombreDocente: {
    type: String,
    required: true
  },
  horario: [{
    dia: {
      type: String,
      required: true
    },
    horaInicio: {
      type: String,
      required: true
    },
    horaFin: {
      type: String,
      required: true
    }
  }],
  aula: {
    type: String,
    required: true
  },
  cupo: {
    type: Number,
    required: true
  },
  cantidadMatriculados: {
    type: Number,
    default: 0
  },
  estado: {
    type: String,
    default: 'activo'
  }
});

const Seccion = mongoose.model('Seccion', seccionSchema);
module.exports = Seccion;