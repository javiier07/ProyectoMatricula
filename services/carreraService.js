const Carrera = require('../models/Carreras');

const obtenerCarreras = async () => {
    const carreras = await Carrera.find();
    return carreras;
};

const obtenerCarreraPorCodigo = async (codigo) => {
    const carrera = await Carrera.findOne({ codigo: codigo });
    return carrera;
};

const crearCarrera = async (datosCarrera) => {
    const nuevaCarrera = await Carrera.create(datosCarrera)
    return nuevaCarrera;
};

const eliminarCarrera = async (codigo) => {
    const carreraEliminada = await Carrera.findOneAndDelete({ codigo: codigo })
    return carreraEliminada;
};

const actualizarCarrera = async (codigo, datosCarrera) => {
    const carreraActualizada = await Carrera.findOneAndUpdate({ codigo: codigo }, datosCarrera, 
        {new: true, runValidators: true})
    return carreraActualizada;
};

module.exports = {
    obtenerCarreras,
    obtenerCarreraPorCodigo,
    crearCarrera,
    eliminarCarrera,
    actualizarCarrera
};