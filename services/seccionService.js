const Seccion = require('../models/Secciones');
const Asignatura = require('../models/Asignaturas');
const Periodo = require('../models/Periodos');

const normalizarCodigo = (valor) => String(valor || '').trim().toUpperCase();
const normalizarTexto = (valor) => String(valor || '').trim();

const obtenerSecciones = async () => {
    const secciones = await Seccion.find();
    return secciones;
};

const obtenerSeccion = async ({ periodoNombre, asignaturaCodigo, codigoSeccion }) => {
    const seccion = await Seccion.findOne({
        periodoNombre: normalizarTexto(periodoNombre),
        asignaturaCodigo: normalizarCodigo(asignaturaCodigo),
        codigoSeccion: normalizarCodigo(codigoSeccion)
    });
    return seccion;
};

const crearSeccion = async (datosSeccion) => {
    const datos = {
        ...datosSeccion,
        asignaturaCodigo: datosSeccion.asignaturaCodigo ? normalizarCodigo(datosSeccion.asignaturaCodigo) : datosSeccion.asignaturaCodigo,
        periodoNombre: datosSeccion.periodoNombre ? normalizarTexto(datosSeccion.periodoNombre) : datosSeccion.periodoNombre,
        codigoSeccion: datosSeccion.codigoSeccion ? normalizarCodigo(datosSeccion.codigoSeccion) : datosSeccion.codigoSeccion
    };

    if (datos.asignaturaCodigo) {
        const asignaturaExiste = await Asignatura.findOne({ codigo: datos.asignaturaCodigo });
        if (!asignaturaExiste) {
            throw new Error(`La asignatura "${datos.asignaturaCodigo}" no existe`);
        }
    }

    if (datos.periodoNombre) {
        const periodoExiste = await Periodo.findOne({ nombre: datos.periodoNombre });
        if (!periodoExiste) {
            throw new Error(`El período "${datos.periodoNombre}" no existe`);
        }
    }

    if (datos.cupo !== undefined && datos.cantidadMatriculados !== undefined && datos.cantidadMatriculados > datos.cupo) {
        throw new Error('La cantidad de matriculados no puede superar el cupo');
    }

    if (Array.isArray(datos.horario)) {
        for (const bloque of datos.horario) {
            if (bloque.horaInicio && bloque.horaFin && bloque.horaFin <= bloque.horaInicio) {
                throw new Error(`En el día ${bloque.dia || ''}, la horaFin debe ser mayor que la horaInicio`.trim());
            }
        }
    }

    const nuevaSeccion = await Seccion.create(datos);
    return nuevaSeccion;
};

const eliminarSeccion = async ({ periodoNombre, asignaturaCodigo, codigoSeccion }) => {
    const seccionEliminada = await Seccion.findOneAndDelete({
        periodoNombre: normalizarTexto(periodoNombre),
        asignaturaCodigo: normalizarCodigo(asignaturaCodigo),
        codigoSeccion: normalizarCodigo(codigoSeccion)
    });
    return seccionEliminada;
};

const actualizarSeccion = async ({ periodoNombre, asignaturaCodigo, codigoSeccion }, datosSeccion) => {
    const filtro = {
        periodoNombre: normalizarTexto(periodoNombre),
        asignaturaCodigo: normalizarCodigo(asignaturaCodigo),
        codigoSeccion: normalizarCodigo(codigoSeccion)
    };

    const seccionActual = await Seccion.findOne(filtro);
    if (!seccionActual) {
        return null;
    }

    const datos = {
        ...datosSeccion,
        ...(datosSeccion.asignaturaCodigo !== undefined && { asignaturaCodigo: normalizarCodigo(datosSeccion.asignaturaCodigo) }),
        ...(datosSeccion.periodoNombre !== undefined && { periodoNombre: normalizarTexto(datosSeccion.periodoNombre) }),
        ...(datosSeccion.codigoSeccion !== undefined && { codigoSeccion: normalizarCodigo(datosSeccion.codigoSeccion) })
    };

    if (datos.asignaturaCodigo) {
        const asignaturaExiste = await Asignatura.findOne({ codigo: datos.asignaturaCodigo });
        if (!asignaturaExiste) {
            throw new Error(`La asignatura "${datos.asignaturaCodigo}" no existe`);
        }
    }

    if (datos.periodoNombre) {
        const periodoExiste = await Periodo.findOne({ nombre: datos.periodoNombre });
        if (!periodoExiste) {
            throw new Error(`El período "${datos.periodoNombre}" no existe`);
        }
    }

    const cupoFinal = datos.cupo ?? seccionActual.cupo;
    const matriculadosFinal = datos.cantidadMatriculados ?? seccionActual.cantidadMatriculados;
    if (matriculadosFinal > cupoFinal) {
        throw new Error('La cantidad de matriculados no puede superar el cupo');
    }

    const horarioFinal = datos.horario ?? seccionActual.horario;
    if (Array.isArray(horarioFinal)) {
        for (const bloque of horarioFinal) {
            if (bloque.horaInicio && bloque.horaFin && bloque.horaFin <= bloque.horaInicio) {
                throw new Error(`En el día ${bloque.dia || ''}, la horaFin debe ser mayor que la horaInicio`.trim());
            }
        }
    }

    const seccionActualizada = await Seccion.findOneAndUpdate(
        filtro,
        datos,
        { new: true, runValidators: true }
    );
    return seccionActualizada;
};

module.exports = {
    obtenerSecciones,
    obtenerSeccion,
    crearSeccion,
    eliminarSeccion,
    actualizarSeccion
};