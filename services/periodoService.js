const Periodo = require('../models/Periodos');

const validarFechasPeriodo = (datos) => {
    const fechaInicio = datos.fechaInicio ? new Date(datos.fechaInicio) : null;
    const inicioMatricula = datos.inicioMatricula ? new Date(datos.inicioMatricula) : null;
    const finMatricula = datos.finMatricula ? new Date(datos.finMatricula) : null;
    const fechaLimiteCancelacion = datos.fechaLimiteCancelacion ? new Date(datos.fechaLimiteCancelacion) : null;

    if (inicioMatricula && finMatricula && inicioMatricula > finMatricula) {
        throw new Error('La fecha de inicio de matrícula no puede ser mayor que la fecha de fin de matrícula');
    }

    if (fechaInicio && inicioMatricula && inicioMatricula < fechaInicio) {
        throw new Error('El inicio de matrícula no puede ser anterior a la fecha de inicio del período');
    }

    if (inicioMatricula && fechaLimiteCancelacion && fechaLimiteCancelacion < inicioMatricula) {
        throw new Error('La fecha límite de cancelación no puede ser anterior al inicio de matrícula');
    }
};

const obtenerPeriodos = async () => {
    const periodos = await Periodo.find();
    return periodos;
};

const obtenerPeriodoPorNombre = async (nombre) => {
    const periodo = await Periodo.findOne({ nombre });
    return periodo;
};

const crearPeriodo = async (datosPeriodo) => {
    validarFechasPeriodo(datosPeriodo);

    if (datosPeriodo.nombre) {
        const periodoExistente = await Periodo.findOne({ nombre: datosPeriodo.nombre.trim() });
        if (periodoExistente) {
            throw new Error(`Ya existe un período con el nombre "${datosPeriodo.nombre}"`);
        }
    }

    const nuevoPeriodo = await Periodo.create(datosPeriodo);
    return nuevoPeriodo;
};

const eliminarPeriodo = async (nombre) => {
    const periodoEliminado = await Periodo.findOneAndDelete({ nombre });
    return periodoEliminado;
};

const actualizarPeriodo = async (nombre, datosPeriodo) => {
    const periodoActual = await Periodo.findOne({ nombre });
    if (!periodoActual) {
        return null;
    }

    const datosCombinados = {
        fechaInicio: datosPeriodo.fechaInicio ?? periodoActual.fechaInicio,
        inicioMatricula: datosPeriodo.inicioMatricula ?? periodoActual.inicioMatricula,
        finMatricula: datosPeriodo.finMatricula ?? periodoActual.finMatricula,
        fechaLimiteCancelacion: datosPeriodo.fechaLimiteCancelacion ?? periodoActual.fechaLimiteCancelacion
    };

    validarFechasPeriodo(datosCombinados);

    const periodoActualizado = await Periodo.findOneAndUpdate(
        { nombre },
        datosPeriodo,
        { new: true, runValidators: true }
    );
    return periodoActualizado;
};

module.exports = {
    obtenerPeriodos,
    obtenerPeriodoPorNombre,
    crearPeriodo,
    eliminarPeriodo,
    actualizarPeriodo
};