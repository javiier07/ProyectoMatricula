const asignaturaService = require('../services/asignaturaService');

const obtenerAsignaturas = async (req, res) => {
    try {
        const asignaturas = await asignaturaService.obtenerAsignaturas();

        res.status(200).json({
            success: true,
            total: asignaturas.length,
            data: asignaturas
        });
    } catch (error) {
        console.error('Error al obtener asignaturas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las asignaturas',
            error: error.message
        });
    }
};

const obtenerAsignaturaPorCodigo = async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const asignatura = await asignaturaService.obtenerAsignaturaPorCodigo(codigo);

        if (!asignatura) {
            return res.status(404).json({
                success: false,
                message: 'Asignatura no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: asignatura
        });
    } catch (error) {
        console.error('Error al obtener asignatura por código:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la asignatura',
            error: error.message
        });
    }
};

const crearAsignatura = async (req, res) => {
    try {
        const datosAsignatura = req.body;
        const asignaturaCreada = await asignaturaService.crearAsignatura(datosAsignatura);

        res.status(201).json({
            success: true,
            message: 'Asignatura creada correctamente',
            data: asignaturaCreada
        });
    } catch (error) {
        console.error('Error al crear asignatura:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear la asignatura',
            error: error.message
        });
    }
};

const eliminarAsignatura = async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const asignaturaEliminada = await asignaturaService.eliminarAsignatura(codigo);

        if (!asignaturaEliminada) {
            return res.status(404).json({
                success: false,
                message: 'Asignatura no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Asignatura eliminada correctamente',
            data: asignaturaEliminada
        });
    } catch (error) {
        console.error('Error al eliminar asignatura:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la asignatura',
            error: error.message
        });
    }
};

const actualizarAsignatura = async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const datosAsignatura = req.body;
        const asignaturaActualizada = await asignaturaService.actualizarAsignatura(codigo, datosAsignatura);

        if (!asignaturaActualizada) {
            return res.status(404).json({
                success: false,
                message: 'Asignatura no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Asignatura actualizada correctamente',
            data: asignaturaActualizada
        });
    } catch (error) {
        console.error('Error al actualizar asignatura:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la asignatura',
            error: error.message
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