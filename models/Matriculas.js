const mongoose = require('mongoose');

const matriculaSchema = new mongoose.Schema({
  codigoMatricula: {
    type: String,
    required: true,
    unique: true
  },
  alumnoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  periodoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Periodo',
    required: true
  },
  estado: {
    type: String,
    default: 'CONFIRMADA'
  },
  fechaMatricula: {
    type: Date,
    default: Date.now
  },
  totalCreditos: {
    type: Number,
    default: 0
  },
  asignaturas: [{
    seccionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seccion',
      required: true
    },
    asignaturaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asignatura',
      required: true
    },
    creditos: {
      type: Number,
      required: true
    },
    estado: {
      type: String,
      default: 'ACTIVA'
    }
  }]
});

const Matricula = mongoose.model('Matricula', matriculaSchema);
module.exports = Matricula;