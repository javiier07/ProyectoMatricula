const mongoose = require('mongoose');

const eventoMatriculaSchema = new mongoose.Schema({
  matriculaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matricula',
    required: true
  },
  alumnoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  seccionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seccion',
    required: true
  },
  accion: {
    type: String,
    required: true
  },
  motivo: {
    type: String,
    default: ''
  },
  realizadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

const EventoMatricula = mongoose.model('EventoMatricula', eventoMatriculaSchema);
module.exports = EventoMatricula;