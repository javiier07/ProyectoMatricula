const Usuario = require('../models/Usuarios');
const Carrera = require('../models/Carreras');
const Asignatura = require('../models/Asignaturas');

const validarReferenciasUsuario = async (datosUsuario) => {
    if (datosUsuario.carreraCodigo) {
        const carreraExiste = await Carrera.findOne({ codigo: datosUsuario.carreraCodigo });
        if (!carreraExiste) {
            throw new Error(`No existe una carrera con el código ${datosUsuario.carreraCodigo}`);
        }
    }

    if (Array.isArray(datosUsuario.asignaturasAprobadasCodigo) && datosUsuario.asignaturasAprobadasCodigo.length > 0) {
        for (const codigoAsignatura of datosUsuario.asignaturasAprobadasCodigo) {
            const asignaturaExiste = await Asignatura.findOne({ codigo: codigoAsignatura });
            if (!asignaturaExiste) {
                throw new Error(`No existe una asignatura con el código ${codigoAsignatura}`);
            }
        }
    }
};

const obtenerUsuarios = async () => {
    const usuarios = await Usuario.find();
    return usuarios;
};

const obtenerUsuarioPorCorreo = async (correo) => {
    const usuario = await Usuario.findOne({ correo: correo });
    return usuario;
}

const crearUsuario = async (datosUsuario) => {
    await validarReferenciasUsuario(datosUsuario);
    const nuevoUsuario = await Usuario.create(datosUsuario)
    return nuevoUsuario;
}

const eliminarUsuario = async (correo) => {
    const usuarioEliminado = await Usuario.findOneAndDelete({ correo: correo })
    return usuarioEliminado;
}

const actualizarUsuario = async (correo, datosUsuario) => {
    await validarReferenciasUsuario(datosUsuario);
    const usuarioActualizado = await Usuario.findOneAndUpdate({ correo: correo }, datosUsuario, 
        {new: true, runValidators: true})
    return usuarioActualizado;
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorCorreo,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario
}