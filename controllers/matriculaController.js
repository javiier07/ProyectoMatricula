
const matriculaService = require('../services/matriculaService');

const obtenerMatriculas = async (req, res) => {
    try {
        const matriculas = await matriculaService.obtenerMatriculas();

        res.status(200).json({
            success: true,
            total: matriculas.length,
            data: matriculas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las matriculas',
            error: error.message
        });
    }
};

const obtenerMatriculaPorCodigo = async (req, res) => {
    try {
        const { codigoMatricula } = req.params;
        const matricula = await matriculaService.obtenerMatriculaPorCodigo(codigoMatricula);

        if (!matricula) {
            return res.status(404).json({
                success: false,
                message: 'Matricula no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: matricula
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la matricula',
            error: error.message
        });
    }
};

const crearMatricula = async (req, res) => {
    try {
        const nuevaMatricula = await matriculaService.crearMatricula(req.body);

        res.status(201).json({
            success: true,
            message: 'Matricula creada correctamente',
            data: nuevaMatricula
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la matricula',
            error: error.message
        });
    }
};

const actualizarMatricula = async (req, res) => {
    try {
        const { codigoMatricula } = req.params;
        const matriculaActualizada = await matriculaService.actualizarMatricula(
            codigoMatricula,
            req.body
        );

        if (!matriculaActualizada) {
            return res.status(404).json({
                success: false,
                message: 'Matricula no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Matricula actualizada correctamente',
            data: matriculaActualizada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la matricula',
            error: error.message
        });
    }
};

const eliminarMatricula = async (req, res) => {
    try {
        const { codigoMatricula } = req.params;
        const matriculaEliminada = await matriculaService.eliminarMatricula(codigoMatricula);

        if (!matriculaEliminada) {
            return res.status(404).json({
                success: false,
                message: 'Matricula no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Matricula eliminada correctamente',
            data: matriculaEliminada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la matricula',
            error: error.message
        });
    }
};

module.exports = {
    obtenerMatriculas,
    obtenerMatriculaPorCodigo,
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula
};