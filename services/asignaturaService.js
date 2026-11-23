const Asignatura = require('../models/Asignaturas');
const Carrera = require('../models/Carreras');

const validarCarreraYPrerrequisitos = async (datos, codigoActual = null) => {
    if (datos.carreraCodigo) {
        const carreraExiste = await Carrera.findOne({ codigo: datos.carreraCodigo });
        if (!carreraExiste) {
            throw new Error(`No existe una carrera con el código ${datos.carreraCodigo}`);
        }
    }

    if (Array.isArray(datos.prerrequisitosCodigos) && datos.prerrequisitosCodigos.length > 0) {
        for (const codPrerrequisito of datos.prerrequisitosCodigos) {
            if (codigoActual && codPrerrequisito === codigoActual) {
                throw new Error(`Una asignatura no puede ser prerrequisito de sí misma (${codPrerrequisito})`);
            }
            const prerrequisitoExiste = await Asignatura.findOne({ codigo: codPrerrequisito });
            if (!prerrequisitoExiste) {
                throw new Error(`No existe una asignatura prerrequisito con el código ${codPrerrequisito}`);
            }
        }
    }
};

const obtenerAsignaturas = async () => {
    const asignaturas = await Asignatura.find();
    return asignaturas;
};

const obtenerAsignaturaPorCodigo = async (codigo) => {
    const asignatura = await Asignatura.findOne({ codigo });
    return asignatura;
};

const crearAsignatura = async (datosAsignaturas) => {
    await validarCarreraYPrerrequisitos(datosAsignaturas, datosAsignaturas.codigo);

    const asignatura = new Asignatura(datosAsignaturas);
    await asignatura.save();
    return asignatura;
};

const eliminarAsignatura = async (codigo) => {
    const asignatura = await Asignatura.findOneAndDelete({ codigo });
    return asignatura;
};

const actualizarAsignatura = async (codigo, datosAsignaturas) => {
    await validarCarreraYPrerrequisitos(datosAsignaturas, codigo);

    const asignatura = await Asignatura.findOneAndUpdate(
        { codigo },
        datosAsignaturas,
        { new: true, runValidators: true }
    );
    return asignatura;
};

module.exports = {
    obtenerAsignaturas,
    obtenerAsignaturaPorCodigo,
    crearAsignatura,
    eliminarAsignatura,
    actualizarAsignatura
};