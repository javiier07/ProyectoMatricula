const usuarioService = require('../services/usuarioService');

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.status(200).json({
            success: true,
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los usuarios',
            error: error.message
        });
    }
};

const obtenerUsuarioPorCorreo = async (req, res) => {
    try {
        const { correo } = req.params;
        const usuario = await usuarioService.obtenerUsuarioPorCorreo(correo);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario',
            error: error.message
        });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await usuarioService.crearUsuario(req.body);
        res.status(201).json({
            success: true,
            data: nuevoUsuario,
            message: 'Usuario creado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { correo } = req.params;
        const usuarioActualizado = await usuarioService.actualizarUsuario(correo, req.body);

        if (!usuarioActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: usuarioActualizado
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { correo } = req.params;
        const usuarioEliminado = await usuarioService.eliminarUsuario(correo);

        if (!usuarioEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario eliminado correctamente',
            data: usuarioEliminado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el usuario',
            error: error.message
        });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorCorreo,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};