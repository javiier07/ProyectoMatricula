const seccionService = require('../services/seccionService');

const obtenerSecciones = async (req, res) => {
    try {
        const secciones = await seccionService.obtenerSecciones();

        res.status(200).json({
            success: true,
            total: secciones.length,
            data: secciones
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las secciones',
            error: error.message
        });
    }
};

const obtenerSeccion = async (req, res) => {
    try {
        const { periodoNombre, asignaturaCodigo, codigoSeccion } = req.params;
        const seccion = await seccionService.obtenerSeccion({
            periodoNombre,
            asignaturaCodigo,
            codigoSeccion
        });

        if (!seccion) {
            return res.status(404).json({
                success: false,
                message: 'Seccion no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: seccion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la seccion',
            error: error.message
        });
    }
};

const crearSeccion = async (req, res) => {
    try {
        const nuevaSeccion = await seccionService.crearSeccion(req.body);

        res.status(201).json({
            success: true,
            message: 'Seccion creada correctamente',
            data: nuevaSeccion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la seccion',
            error: error.message
        });
    }
};

const actualizarSeccion = async (req, res) => {
    try {
        const { periodoNombre, asignaturaCodigo, codigoSeccion } = req.params;
        const seccionActualizada = await seccionService.actualizarSeccion(
            { periodoNombre, asignaturaCodigo, codigoSeccion },
            req.body
        );

        if (!seccionActualizada) {
            return res.status(404).json({
                success: false,
                message: 'Seccion no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Seccion actualizada correctamente',
            data: seccionActualizada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la seccion',
            error: error.message
        });
    }
};

const eliminarSeccion = async (req, res) => {
    try {
        const { periodoNombre, asignaturaCodigo, codigoSeccion } = req.params;
        const seccionEliminada = await seccionService.eliminarSeccion({
            periodoNombre,
            asignaturaCodigo,
            codigoSeccion
        });

        if (!seccionEliminada) {
            return res.status(404).json({
                success: false,
                message: 'Seccion no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Seccion eliminada correctamente',
            data: seccionEliminada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la seccion',
            error: error.message
        });
    }
};

module.exports = {
    obtenerSecciones,
    obtenerSeccion,
    crearSeccion,
    actualizarSeccion,
    eliminarSeccion
};