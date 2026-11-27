const eventoMatriculaService = require('../services/eventoMatriculaService');

const obtenerEventosMatricula = async (req, res) => {
    try {
        const eventos = await eventoMatriculaService.obtenerEventosMatricula();

        res.status(200).json({
            success: true,
            total: eventos.length,
            data: eventos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los eventos de matricula',
            error: error.message
        });
    }
};

const obtenerEventoMatriculaPorCodigo = async (req, res) => {
    try {
        const { codigoEvento } = req.params;
        const evento = await eventoMatriculaService.obtenerEventoMatriculaPorCodigo(codigoEvento);

        if (!evento) {
            return res.status(404).json({
                success: false,
                message: 'Evento de matricula no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: evento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el evento de matricula',
            error: error.message
        });
    }
};

const crearEventoMatricula = async (req, res) => {
    try {
        const nuevoEvento = await eventoMatriculaService.crearEventoMatricula(req.body);

        res.status(201).json({
            success: true,
            message: 'Evento de matricula creado correctamente',
            data: nuevoEvento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el evento de matricula',
            error: error.message
        });
    }
};

const actualizarEventoMatricula = async (req, res) => {
    try {
        const { codigoEvento } = req.params;
        const eventoActualizado = await eventoMatriculaService.actualizarEventoMatricula(
            codigoEvento,
            req.body
        );

        if (!eventoActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Evento de matricula no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Evento de matricula actualizado correctamente',
            data: eventoActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el evento de matricula',
            error: error.message
        });
    }
};

const eliminarEventoMatricula = async (req, res) => {
    try {
        const { codigoEvento } = req.params;
        const eventoEliminado = await eventoMatriculaService.eliminarEventoMatricula(codigoEvento);

        if (!eventoEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Evento de matricula no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Evento de matricula eliminado correctamente',
            data: eventoEliminado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el evento de matricula',
            error: error.message
        });
    }
};

module.exports = {
    obtenerEventosMatricula,
    obtenerEventoMatriculaPorCodigo,
    crearEventoMatricula,
    actualizarEventoMatricula,
    eliminarEventoMatricula
};