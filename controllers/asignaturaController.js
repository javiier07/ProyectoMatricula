const asignaturaService = require('../services/asignaturaService');

const obtenerAsignaturas = async (req, res) => {
    try {
        const asignaturas = await asignaturaService.obtenerAsignaturas();

        res.status(200).json({
            success: true,
            data: asignaturas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las asignaturas'
        });
    }
};

const obtenerAsignaturaPorCodigo = async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const asignatura = await asignaturaService.obtenerAsignaturaPorCodigo(codigo);

        res.status(200).json({
            success: true,
            data: asignatura
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la asignatura'
        });
    }
};

const crearAsignatura = async (req, res) => {
    try {
        const datosAsignatura = req.body;
        const asignaturaCreada = await asignaturaService.crearAsignatura(datosAsignatura);

        res.status(201).json({
            success: true,
            data: asignaturaCreada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la asignatura'
        });
    }
};

const eliminarAsignatura = async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const asignaturaEliminada = await asignaturaService.eliminarAsignatura(codigo);

        res.status(200).json({
            success: true,
            data: asignaturaEliminada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la asignatura'
        });
    }
};

const actualizarAsignatura = async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const datosAsignatura = req.body;
        const asignaturaActualizada = await asignaturaService.actualizarAsignatura(codigo, datosAsignatura);

        res.status(200).json({
            success: true,
            data: asignaturaActualizada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la asignatura'
        });
    }
};

module.exports = {
    obtenerAsignaturas,
    obtenerAsignaturaPorCodigo,
    crearAsignatura,
    eliminarAsignatura,
    actualizarAsignatura
};