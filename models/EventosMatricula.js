const mongoose = require('mongoose');

const eventoMatriculaSchema = new mongoose.Schema(
  {
    codigoEvento: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    codigoMatricula: {
      type: String,
      trim: true,
      uppercase: true
    },
    numeroCuenta: {
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
    asignaturaCodigo: {
      type: String,
      trim: true,
      uppercase: true
    },
    codigoSeccion: {
      type: String,
      trim: true,
      uppercase: true
    },
    tipoEvento: {
      type: String,
      required: true,
      enum: [
        'crear_matricula',
        'adicionar_asignatura',
        'cancelar_asignatura',
        'cambiar_seccion',
        'confirmar_matricula',
        'anular_matricula'
      ],
      trim: true,
      lowercase: true
    },
    estadoAnterior: {
      type: String,
      trim: true,
      lowercase: true
    },
    estadoNuevo: {
      type: String,
      trim: true,
      lowercase: true
    },
    realizadoPor: {
      type: String,
      default: 'sistema',
      trim: true,
      lowercase: true
    },
    observacion: {
      type: String,
      trim: true
    },
    fechaEvento: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

eventoMatriculaSchema.index({ numeroCuenta: 1, periodoNombre: 1, fechaEvento: -1 });

const EventoMatricula = mongoose.model('EventoMatricula', eventoMatriculaSchema);
module.exports = EventoMatricula;