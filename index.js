require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/database');


const carreraRoutes = require('./routes/carreraRoutes');
const asignaturaRoutes = require('./routes/asignaturaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const periodoRoutes = require('./routes/periodoRoutes');
const seccionRoutes = require('./routes/seccionRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');
const eventoMatriculaRoutes = require('./routes/eventoMatriculaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

conectarDB();

app.use(cors());
app.use(express.json());

app.use('/api/carreras', carreraRoutes);
app.use('/api/asignaturas', asignaturaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/periodos', periodoRoutes);
app.use('/api/secciones', seccionRoutes);
app.use('/api/matriculas', matriculaRoutes);
app.use('/api/eventos-matricula', eventoMatriculaRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API del Sistema de Matrícula Universitaria activa' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});