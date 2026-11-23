const mongoose = require('mongoose');

const asignaturaSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  creditos: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String
  },
  prerrequisitosCodigos: [{
    type: String
  }],
  carreraCodigo: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    default: 'activo'
  }
});

const Asignatura = mongoose.model('Asignatura', asignaturaSchema);
module.exports = Asignatura;