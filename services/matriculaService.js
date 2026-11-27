const Matricula = require('../models/Matriculas');
const Usuario = require('../models/Usuarios');
const Periodo = require('../models/Periodos');
const Asignatura = require('../models/Asignaturas');
const Seccion = require('../models/Secciones');

const normalizarCodigo = (valor) => String(valor || '').trim().toUpperCase();
const normalizarTexto = (valor) => String(valor || '').trim();
const normalizarEstado = (valor) => String(valor || '').trim().toLowerCase();

const calcularTotalCreditos = (asignaturas = []) => {
    return asignaturas
        .filter((item) => normalizarEstado(item.estado) !== 'cancelada')
        .reduce((acc, item) => acc + Number(item.creditos || 0), 0);
};

const normalizarAsignaturas = async (asignaturas = [], periodoNombre) => {
    if (!Array.isArray(asignaturas)) {
        return [];
    }

    const normalizadas = [];
    const asignaturasVistas = new Set();

    for (const item of asignaturas) {
        const asignaturaCod = normalizarCodigo(item.asignaturaCodigo);
        const seccionCod = normalizarCodigo(item.codigoSeccion);

        if (!asignaturaCod) {
            throw new Error('Cada asignatura en la matrícula debe incluir asignaturaCodigo');
        }
        if (!seccionCod) {
            throw new Error(`La asignatura "${asignaturaCod}" debe incluir codigoSeccion`);
        }
        if (asignaturasVistas.has(asignaturaCod)) {
            throw new Error(`La asignatura "${asignaturaCod}" está duplicada en la matrícula`);
        }
        asignaturasVistas.add(asignaturaCod);

        const asignaturaDoc = await Asignatura.findOne({ codigo: asignaturaCod });
        if (!asignaturaDoc) {
            throw new Error(`La asignatura "${asignaturaCod}" no existe`);
        }

        const seccionDoc = await Seccion.findOne({
            periodoNombre: normalizarTexto(periodoNombre),
            asignaturaCodigo: asignaturaCod,
            codigoSeccion: seccionCod
        });
        if (!seccionDoc) {
            throw new Error(`La sección "${seccionCod}" de la asignatura "${asignaturaCod}" en el período "${periodoNombre}" no existe`);
        }

        normalizadas.push({
            asignaturaCodigo: asignaturaCod,
            codigoSeccion: seccionCod,
            creditos: item.creditos !== undefined ? Number(item.creditos) : Number(asignaturaDoc.creditos),
            estado: item.estado ? normalizarEstado(item.estado) : 'activa'
        });
    }

    return normalizadas;
};

const validarEntidadesBase = async ({ numeroCuenta, periodoNombre }) => {
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
};

const obtenerMatriculas = async () => {
    const matriculas = await Matricula.find();
    return matriculas;
};

const obtenerMatriculaPorCodigo = async (codigoMatricula) => {
    const matricula = await Matricula.findOne({
        codigoMatricula: normalizarCodigo(codigoMatricula)
    });
    return matricula;
};

const crearMatricula = async (datosMatricula) => {
    const periodoNorm = datosMatricula.periodoNombre ? normalizarTexto(datosMatricula.periodoNombre) : datosMatricula.periodoNombre;
    const cuentaNorm = datosMatricula.numeroCuenta ? normalizarCodigo(datosMatricula.numeroCuenta) : datosMatricula.numeroCuenta;
    const codigoNorm = datosMatricula.codigoMatricula ? normalizarCodigo(datosMatricula.codigoMatricula) : datosMatricula.codigoMatricula;

    await validarEntidadesBase({
        numeroCuenta: cuentaNorm,
        periodoNombre: periodoNorm
    });

    const asignaturasNormalizadas = await normalizarAsignaturas(datosMatricula.asignaturas, periodoNorm);
    const totalCreditosCalculado = calcularTotalCreditos(asignaturasNormalizadas);

    const datos = {
        ...datosMatricula,
        codigoMatricula: codigoNorm,
        numeroCuenta: cuentaNorm,
        periodoNombre: periodoNorm,
        ...(datosMatricula.estado !== undefined && { estado: normalizarEstado(datosMatricula.estado) }),
        asignaturas: asignaturasNormalizadas,
        totalCreditos: datosMatricula.totalCreditos !== undefined ? Number(datosMatricula.totalCreditos) : totalCreditosCalculado
    };

    const nuevaMatricula = await Matricula.create(datos);
    return nuevaMatricula;
};

const eliminarMatricula = async (codigoMatricula) => {
    const matriculaEliminada = await Matricula.findOneAndDelete({
        codigoMatricula: normalizarCodigo(codigoMatricula)
    });
    return matriculaEliminada;
};

const actualizarMatricula = async (codigoMatricula, datosMatricula) => {
    const filtro = { codigoMatricula: normalizarCodigo(codigoMatricula) };

    const matriculaActual = await Matricula.findOne(filtro);
    if (!matriculaActual) {
        return null;
    }

    const periodoFinal = datosMatricula.periodoNombre !== undefined
        ? normalizarTexto(datosMatricula.periodoNombre)
        : matriculaActual.periodoNombre;

    const cuentaFinal = datosMatricula.numeroCuenta !== undefined
        ? normalizarCodigo(datosMatricula.numeroCuenta)
        : matriculaActual.numeroCuenta;

    await validarEntidadesBase({
        numeroCuenta: datosMatricula.numeroCuenta !== undefined ? cuentaFinal : null,
        periodoNombre: datosMatricula.periodoNombre !== undefined ? periodoFinal : null
    });

    const asignaturasFinales = datosMatricula.asignaturas !== undefined
        ? await normalizarAsignaturas(datosMatricula.asignaturas, periodoFinal)
        : matriculaActual.asignaturas;

    const totalCreditosFinal = datosMatricula.totalCreditos !== undefined
        ? Number(datosMatricula.totalCreditos)
        : calcularTotalCreditos(asignaturasFinales);

    const datos = {
        ...datosMatricula,
        ...(datosMatricula.codigoMatricula !== undefined && { codigoMatricula: normalizarCodigo(datosMatricula.codigoMatricula) }),
        ...(datosMatricula.numeroCuenta !== undefined && { numeroCuenta: cuentaFinal }),
        ...(datosMatricula.periodoNombre !== undefined && { periodoNombre: periodoFinal }),
        ...(datosMatricula.estado !== undefined && { estado: normalizarEstado(datosMatricula.estado) }),
        asignaturas: asignaturasFinales,
        totalCreditos: totalCreditosFinal
    };

    const matriculaActualizada = await Matricula.findOneAndUpdate(
        filtro,
        datos,
        { new: true, runValidators: true }
    );
    return matriculaActualizada;
};

module.exports = {
    obtenerMatriculas,
    obtenerMatriculaPorCodigo,
    crearMatricula,
    eliminarMatricula,
    actualizarMatricula
};