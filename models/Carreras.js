const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    descripcion: {
      type: String,
      trim: true
    },
    maximoCreditos: {
      type: Number,
      default: 18,
      min: 1
    },
    estado: {
      type: String,
      enum: ['activo', 'inactivo'],
      default: 'activo'
    }
  },
  { timestamps: true }
);

const Carrera = mongoose.model('Carrera', carreraSchema);
module.exports = Carrera;