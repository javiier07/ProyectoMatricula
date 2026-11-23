const carreraService = require('../services/carreraService');

const obtenerCarreras = async (req, res) => {
    try {
        const carreras = await carreraService.obtenerCarreras();

        res.status(200).json({
            success: true,
            total: carreras.length,
            data: carreras
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las carreras',
            error: error.message
        });
    }
};

const crearCarrera = async (req, res) => {
    try {
        const nuevaCarrera = await carreraService.crearCarrera(req.body);

        res.status(201).json({
            success: true,
            message: 'Carrera creada correctamente',
            data: nuevaCarrera
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la carrera',
            error: error.message
        });
    }
};

const eliminarCarrera = async (req, res) => {
    try {
        const codigo = req.params.codigo;

        const carreraEliminada = await carreraService.eliminarCarrera(codigo);

        if (!carreraEliminada) {
            return res.status(404).json({
                success: false,
                message: 'Carrera no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Carrera eliminada correctamente',
            data: carreraEliminada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la carrera',
            error: error.message
        });
    }
};

const obtenerCarreraPorCodigo = async (req, res) => {
    try {
        const codigo = req.params.codigo;

        const carrera = await carreraService.obtenerCarreraPorCodigo(codigo);

        if (!carrera) {
            return res.status(404).json({
                success: false,
                message: 'Carrera no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: carrera
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la carrera',
            error: error.message
        });
    }
};

const actualizarCarrera = async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const datosCarrera = req.body;

        const carreraActualizada = await carreraService.actualizarCarrera(
            codigo,
            datosCarrera
        );

        if (!carreraActualizada) {
            return res.status(404).json({
                success: false,
                message: 'Carrera no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Carrera actualizada correctamente',
            data: carreraActualizada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la carrera',
            error: error.message
        });
    }
};

module.exports = {
    obtenerCarreras,
    crearCarrera,
    eliminarCarrera,
    obtenerCarreraPorCodigo,
    actualizarCarrera
};