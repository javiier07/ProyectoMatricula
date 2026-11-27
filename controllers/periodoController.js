const periodoService = require('../services/periodoService');

const obtenerPeriodos = async (req, res) => {
    try {
        const periodos = await periodoService.obtenerPeriodos();

        res.status(200).json({
            success: true,
            total: periodos.length,
            data: periodos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los periodos',
            error: error.message
        });
    }
};

const obtenerPeriodoPorNombre = async (req, res) => {
    try {
        const periodo = await periodoService.obtenerPeriodoPorNombre(req.params.nombre);

        if (!periodo) {
            return res.status(404).json({
                success: false,
                message: 'Periodo no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: periodo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el periodo',
            error: error.message
        });
    }
};

const crearPeriodo = async (req, res) => {
    try {
        const nuevoPeriodo = await periodoService.crearPeriodo(req.body);

        res.status(201).json({
            success: true,
            message: 'Periodo creado correctamente',
            data: nuevoPeriodo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el periodo',
            error: error.message
        });
    }
};

const actualizarPeriodo = async (req, res) => {
    try {
        const periodoActualizado = await periodoService.actualizarPeriodo(req.params.nombre, req.body);

        if (!periodoActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Periodo no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Periodo actualizado correctamente',
            data: periodoActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el periodo',
            error: error.message
        });
    }
};

const eliminarPeriodo = async (req, res) => {
    try {
        const periodoEliminado = await periodoService.eliminarPeriodo(req.params.nombre);

        if (!periodoEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Periodo no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Periodo eliminado correctamente',
            data: periodoEliminado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el periodo',
            error: error.message
        });
    }
};

module.exports = {
    obtenerPeriodos,
    obtenerPeriodoPorNombre,
    crearPeriodo,
    actualizarPeriodo,
    eliminarPeriodo
};


