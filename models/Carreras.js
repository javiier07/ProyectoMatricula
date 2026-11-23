const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String
  },
  maximoCreditos: {
    type: Number,
    default: 18
  },
  estado: {
    type: String,
    default: 'activo'
  }
});

const Carrera = mongoose.model('Carrera', carreraSchema);
module.exports = Carrera;