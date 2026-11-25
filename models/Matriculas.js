const mongoose = require('mongoose');

const asignaturaMatriculadaSchema = new mongoose.Schema(
  {
    asignaturaCodigo: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    codigoSeccion: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    creditos: {
      type: Number,
      required: true,
      min: 1
    },
    estado: {
      type: String,
      enum: ['ACTIVA', 'CANCELADA', 'APROBADA', 'REPROBADA'],
      default: 'ACTIVA'
    }
  },
  { _id: false }
);

const matriculaSchema = new mongoose.Schema(
  {
    codigoMatricula: {
      type: String,
      required: true,
      unique: true,
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
      trim: true,
      uppercase: true
    },
    estado: {
      type: String,
      enum: ['CONFIRMADA', 'CANCELADA', 'PENDIENTE'],
      default: 'CONFIRMADA'
    },
    fechaMatricula: {
      type: Date,
      default: Date.now
    },
    totalCreditos: {
      type: Number,
      default: 0,
      min: 0
    },
    asignaturas: {
      type: [asignaturaMatriculadaSchema],
      default: []
    }
  },
  { timestamps: true }
);

// Un alumno solo debería tener una matrícula registrada por período
matriculaSchema.index({ numeroCuenta: 1, periodoNombre: 1 }, { unique: true });

const Matricula = mongoose.model('Matricula', matriculaSchema);
module.exports = Matricula;