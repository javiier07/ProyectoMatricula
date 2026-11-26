const EventoMatricula = require('../models/EventosMatricula');
const Matricula = require('../models/Matriculas');
const Usuario = require('../models/Usuarios');
const Periodo = require('../models/Periodos');
const Asignatura = require('../models/Asignaturas');
const Seccion = require('../models/Secciones');

const normalizarCodigo = (valor) => String(valor || '').trim().toUpperCase();
const normalizarTexto = (valor) => String(valor || '').trim();
const normalizarEstado = (valor) => String(valor || '').trim().toLowerCase();

const validarEntidadesEvento = async ({
    codigoMatricula,
    numeroCuenta,
    periodoNombre,
    asignaturaCodigo,
    codigoSeccion
}) => {
    if (numeroCuenta) {
        const alumnoExiste = await Usuario.findOne({ numeroCuenta: normalizarCodigo(numeroCuenta) });
        if (!alumnoExiste) {
            throw new Error(`El usuario con número de cuenta "${normalizarCodigo(numeroCuenta)}" no existe`);
        }
    }

    if (periodoNombre) {
        const periodoExiste = await Periodo.findOne({ nombre: normalizarTexto(periodoNombre) });
        if (!periodoExiste) {
            throw new Error(`El período "${normalizarTexto(periodoNombre)}" no existe`);
        }
    }

    if (codigoMatricula) {
        const matriculaExiste = await Matricula.findOne({ codigoMatricula: normalizarCodigo(codigoMatricula) });
        if (!matriculaExiste) {
            throw new Error(`La matrícula "${normalizarCodigo(codigoMatricula)}" no existe`);
        }
    }

    const asignaturaCod = asignaturaCodigo ? normalizarCodigo(asignaturaCodigo) : '';
    const seccionCod = codigoSeccion ? normalizarCodigo(codigoSeccion) : '';
    const periodoNom = periodoNombre ? normalizarTexto(periodoNombre) : '';

    if (asignaturaCod) {
        const asignaturaExiste = await Asignatura.findOne({ codigo: asignaturaCod });
        if (!asignaturaExiste) {
            throw new Error(`La asignatura "${asignaturaCod}" no existe`);
        }
    }

    if (seccionCod) {
        if (!asignaturaCod) {
            throw new Error(`Debe indicar asignaturaCodigo para validar la sección "${seccionCod}"`);
        }

        const filtroSeccion = {
            asignaturaCodigo: asignaturaCod,
            codigoSeccion: seccionCod,
            ...(periodoNom && { periodoNombre: periodoNom })
        };

        const seccionExiste = await Seccion.findOne(filtroSeccion);
        if (!seccionExiste) {
            throw new Error(
                periodoNom
                    ? `La sección "${seccionCod}" de la asignatura "${asignaturaCod}" en el período "${periodoNom}" no existe`
                    : `La sección "${seccionCod}" de la asignatura "${asignaturaCod}" no existe`
            );
        }
    }
};

const obtenerEventosMatricula = async () => {
    const eventos = await EventoMatricula.find().sort({ fechaEvento: -1 });
    return eventos;
};

const obtenerEventoMatriculaPorCodigo = async (codigoEvento) => {
    const evento = await EventoMatricula.findOne({
        codigoEvento: normalizarCodigo(codigoEvento)
    });
    return evento;
};

const crearEventoMatricula = async (datosEvento) => {
    const codigoEventoNorm = datosEvento.codigoEvento ? normalizarCodigo(datosEvento.codigoEvento) : datosEvento.codigoEvento;
    const codigoMatriculaNorm = datosEvento.codigoMatricula ? normalizarCodigo(datosEvento.codigoMatricula) : datosEvento.codigoMatricula;
    const cuentaNorm = datosEvento.numeroCuenta ? normalizarCodigo(datosEvento.numeroCuenta) : datosEvento.numeroCuenta;
    const periodoNorm = datosEvento.periodoNombre ? normalizarTexto(datosEvento.periodoNombre) : datosEvento.periodoNombre;
    const asignaturaNorm = datosEvento.asignaturaCodigo ? normalizarCodigo(datosEvento.asignaturaCodigo) : datosEvento.asignaturaCodigo;
    const seccionNorm = datosEvento.codigoSeccion ? normalizarCodigo(datosEvento.codigoSeccion) : datosEvento.codigoSeccion;

    await validarEntidadesEvento({
        codigoMatricula: codigoMatriculaNorm,
        numeroCuenta: cuentaNorm,
        periodoNombre: periodoNorm,
        asignaturaCodigo: asignaturaNorm,
        codigoSeccion: seccionNorm
    });

    const datos = {
        ...datosEvento,
        codigoEvento: codigoEventoNorm,
        ...(codigoMatriculaNorm !== undefined && { codigoMatricula: codigoMatriculaNorm }),
        numeroCuenta: cuentaNorm,
        periodoNombre: periodoNorm,
        ...(asignaturaNorm !== undefined && { asignaturaCodigo: asignaturaNorm }),
        ...(seccionNorm !== undefined && { codigoSeccion: seccionNorm }),
        ...(datosEvento.tipoEvento !== undefined && { tipoEvento: normalizarEstado(datosEvento.tipoEvento) }),
        ...(datosEvento.estadoAnterior !== undefined && { estadoAnterior: normalizarEstado(datosEvento.estadoAnterior) }),
        ...(datosEvento.estadoNuevo !== undefined && { estadoNuevo: normalizarEstado(datosEvento.estadoNuevo) }),
        ...(datosEvento.realizadoPor !== undefined && { realizadoPor: normalizarEstado(datosEvento.realizadoPor) }),
        ...(datosEvento.observacion !== undefined && { observacion: normalizarTexto(datosEvento.observacion) })
    };

    const nuevoEvento = await EventoMatricula.create(datos);
    return nuevoEvento;
};

const eliminarEventoMatricula = async (codigoEvento) => {
    const eventoEliminado = await EventoMatricula.findOneAndDelete({
        codigoEvento: normalizarCodigo(codigoEvento)
    });
    return eventoEliminado;
};

const actualizarEventoMatricula = async (codigoEvento, datosEvento) => {
    const filtro = { codigoEvento: normalizarCodigo(codigoEvento) };

    const eventoActual = await EventoMatricula.findOne(filtro);
    if (!eventoActual) {
        return null;
    }

    const codigoMatriculaFinal = datosEvento.codigoMatricula !== undefined
        ? (datosEvento.codigoMatricula ? normalizarCodigo(datosEvento.codigoMatricula) : datosEvento.codigoMatricula)
        : eventoActual.codigoMatricula;

    const cuentaFinal = datosEvento.numeroCuenta !== undefined
        ? normalizarCodigo(datosEvento.numeroCuenta)
        : eventoActual.numeroCuenta;

    const periodoFinal = datosEvento.periodoNombre !== undefined
        ? normalizarTexto(datosEvento.periodoNombre)
        : eventoActual.periodoNombre;

    const asignaturaFinal = datosEvento.asignaturaCodigo !== undefined
        ? (datosEvento.asignaturaCodigo ? normalizarCodigo(datosEvento.asignaturaCodigo) : datosEvento.asignaturaCodigo)
        : eventoActual.asignaturaCodigo;

    const seccionFinal = datosEvento.codigoSeccion !== undefined
        ? (datosEvento.codigoSeccion ? normalizarCodigo(datosEvento.codigoSeccion) : datosEvento.codigoSeccion)
        : eventoActual.codigoSeccion;

    await validarEntidadesEvento({
        codigoMatricula: datosEvento.codigoMatricula !== undefined ? codigoMatriculaFinal : null,
        numeroCuenta: datosEvento.numeroCuenta !== undefined ? cuentaFinal : null,
        periodoNombre: datosEvento.periodoNombre !== undefined ? periodoFinal : null,
        asignaturaCodigo: datosEvento.asignaturaCodigo !== undefined ? asignaturaFinal : null,
        codigoSeccion: datosEvento.codigoSeccion !== undefined ? seccionFinal : null
    });

    const datos = {
        ...datosEvento,
        ...(datosEvento.codigoEvento !== undefined && { codigoEvento: normalizarCodigo(datosEvento.codigoEvento) }),
        ...(datosEvento.codigoMatricula !== undefined && { codigoMatricula: codigoMatriculaFinal }),
        ...(datosEvento.numeroCuenta !== undefined && { numeroCuenta: cuentaFinal }),
        ...(datosEvento.periodoNombre !== undefined && { periodoNombre: periodoFinal }),
        ...(datosEvento.asignaturaCodigo !== undefined && { asignaturaCodigo: asignaturaFinal }),
        ...(datosEvento.codigoSeccion !== undefined && { codigoSeccion: seccionFinal }),
        ...(datosEvento.tipoEvento !== undefined && { tipoEvento: normalizarEstado(datosEvento.tipoEvento) }),
        ...(datosEvento.estadoAnterior !== undefined && { estadoAnterior: normalizarEstado(datosEvento.estadoAnterior) }),
        ...(datosEvento.estadoNuevo !== undefined && { estadoNuevo: normalizarEstado(datosEvento.estadoNuevo) }),
        ...(datosEvento.realizadoPor !== undefined && { realizadoPor: normalizarEstado(datosEvento.realizadoPor) }),
        ...(datosEvento.observacion !== undefined && { observacion: normalizarTexto(datosEvento.observacion) })
    };

    const eventoActualizado = await EventoMatricula.findOneAndUpdate(
        filtro,
        datos,
        { new: true, runValidators: true }
    );
    return eventoActualizado;
};

module.exports = {
    obtenerEventosMatricula,
    obtenerEventoMatriculaPorCodigo,
    crearEventoMatricula,
    eliminarEventoMatricula,
    actualizarEventoMatricula
};