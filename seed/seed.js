require('dotenv').config();
const mongoose = require('mongoose');

const Carrera = require('../models/Carreras');
const Asignatura = require('../models/Asignaturas');
const Periodo = require('../models/Periodos');
const Seccion = require('../models/Secciones');
const Usuario = require('../models/Usuarios');

const carrerasData = [
    {
        codigo: 'IS-01',
        nombre: 'Ingeniería en Sistemas Computacionales',
        descripcion: 'Carrera enfocada en desarrollo de software, bases de datos e infraestructura',
        maximoCreditos: 21,
        estado: 'activo'
    },
    {
        codigo: 'AD-01',
        nombre: 'Administración de Empresas',
        descripcion: 'Gestión financiera, operaciones, estrategia y liderazgo organizacional',
        maximoCreditos: 18,
        estado: 'activo'
    },
    {
        codigo: 'RC-01',
        nombre: 'Redes y Ciberseguridad',
        descripcion: 'Arquitectura de redes, administración de servidores y seguridad informática',
        maximoCreditos: 18,
        estado: 'activo'
    }
];

const asignaturasData = [
    {
        codigo: 'PRG-102',
        nombre: 'Programación I Avanzada',
        creditos: 5,
        descripcion: 'Fundamentos sólidos de programación y lógica',
        prerrequisitosCodigos: [],
        carreraCodigo: 'IS-01',
        estado: 'activo'
    },
    {
        codigo: 'BD-201',
        nombre: 'Bases de Datos I',
        creditos: 4,
        descripcion: 'Modelado relacional, SQL, normalización y gestión de consultas',
        prerrequisitosCodigos: ['PRG-102'],
        carreraCodigo: 'IS-01',
        estado: 'activo'
    },
    {
        codigo: 'ED-202',
        nombre: 'Estructuras de Datos',
        creditos: 4,
        descripcion: 'Listas, pilas, colas, árboles, grafos y análisis de complejidad',
        prerrequisitosCodigos: ['PRG-102'],
        carreraCodigo: 'IS-01',
        estado: 'activo'
    },
    {
        codigo: 'DW-301',
        nombre: 'Desarrollo Web Full Stack',
        creditos: 4,
        descripcion: 'Construcción de APIs REST, autenticación e interfaces web modernas',
        prerrequisitosCodigos: ['BD-201'],
        carreraCodigo: 'IS-01',
        estado: 'activo'
    },
    {
        codigo: 'CN-101',
        nombre: 'Contabilidad General',
        creditos: 3,
        descripcion: 'Principios contables, estados financieros y registros operacionales',
        prerrequisitosCodigos: [],
        carreraCodigo: 'AD-01',
        estado: 'activo'
    },
    {
        codigo: 'RD-201',
        nombre: 'Fundamentos de Redes',
        creditos: 4,
        descripcion: 'Modelos OSI y TCP/IP, direccionamiento IP, ruteo y conmutación',
        prerrequisitosCodigos: [],
        carreraCodigo: 'RC-01',
        estado: 'activo'
    }
];

const periodosData = [
    {
        nombre: '2026-3',
        fechaInicio: new Date('2026-09-01T00:00:00.000Z'),
        inicioMatricula: new Date('2026-08-20T00:00:00.000Z'),
        finMatricula: new Date('2026-09-05T23:59:59.999Z'),
        fechaLimiteCancelacion: new Date('2026-10-10T23:59:59.999Z'),
        estado: 'cerrado'
    },
    {
        nombre: '2027-1',
        fechaInicio: new Date('2027-01-05T00:00:00.000Z'),
        inicioMatricula: new Date('2027-01-06T00:00:00.000Z'),
        finMatricula: new Date('2027-01-14T00:00:00.000Z'),
        fechaLimiteCancelacion: new Date('2027-02-10T00:00:00.000Z'),
        estado: 'abierto'
    },
    {
        nombre: '2027-2',
        fechaInicio: new Date('2027-05-01T00:00:00.000Z'),
        inicioMatricula: new Date('2027-05-20T00:00:00.000Z'),
        finMatricula: new Date('2027-05-30T23:59:59.999Z'),
        fechaLimiteCancelacion: new Date('2027-06-25T23:59:59.999Z'),
        estado: 'cerrado'
    },
    {
        nombre: '2027-3',
        fechaInicio: new Date('2027-09-01T00:00:00.000Z'),
        inicioMatricula: new Date('2027-08-18T00:00:00.000Z'),
        finMatricula: new Date('2027-08-30T23:59:59.999Z'),
        fechaLimiteCancelacion: new Date('2027-10-15T23:59:59.999Z'),
        estado: 'abierto'
    }
];

const seccionesData = [
    {
        asignaturaCodigo: 'PRG-102',
        periodoNombre: '2027-2',
        codigoSeccion: '0800',
        nombreDocente: 'Ing. Carlos Mendoza',
        horario: [
            { dia: 'Lunes', horaInicio: '08:00', horaFin: '09:30' },
            { dia: 'Miércoles', horaInicio: '08:00', horaFin: '09:30' }
        ],
        aula: 'B2-304',
        cupo: 35,
        cantidadMatriculados: 0,
        estado: 'activo'
    },
    {
        asignaturaCodigo: 'BD-201',
        periodoNombre: '2027-2',
        codigoSeccion: '0800',
        nombreDocente: 'Ing. Marco Tulio Rivera',
        horario: [
            { dia: 'Lunes', horaInicio: '08:00', horaFin: '09:30' },
            { dia: 'Miércoles', horaInicio: '08:00', horaFin: '09:30' }
        ],
        aula: 'B2-201',
        cupo: 35,
        cantidadMatriculados: 0,
        estado: 'activo'
    },
    {
        asignaturaCodigo: 'ED-202',
        periodoNombre: '2027-2',
        codigoSeccion: '1000',
        nombreDocente: 'Lic. Sofía Elena Castellanos',
        horario: [
            { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
            { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ],
        aula: 'B1-302',
        cupo: 30,
        cantidadMatriculados: 0,
        estado: 'activo'
    },
    {
        asignaturaCodigo: 'DW-301',
        periodoNombre: '2027-1',
        codigoSeccion: '1400',
        nombreDocente: 'Ing. Javier Antonio Mejía',
        horario: [
            { dia: 'Lunes', horaInicio: '14:00', horaFin: '15:30' },
            { dia: 'Miércoles', horaInicio: '14:00', horaFin: '15:30' }
        ],
        aula: 'LAB-104',
        cupo: 25,
        cantidadMatriculados: 0,
        estado: 'activo'
    },
    {
        asignaturaCodigo: 'CN-101',
        periodoNombre: '2027-2',
        codigoSeccion: '0900',
        nombreDocente: 'Lic. Gabriela Fernández',
        horario: [
            { dia: 'Martes', horaInicio: '09:00', horaFin: '10:30' },
            { dia: 'Jueves', horaInicio: '09:00', horaFin: '10:30' }
        ],
        aula: 'A2-105',
        cupo: 40,
        cantidadMatriculados: 0,
        estado: 'activo'
    },
    {
        asignaturaCodigo: 'RD-201',
        periodoNombre: '2027-1',
        codigoSeccion: '1100',
        nombreDocente: 'Ing. Diego Armando Zelaya',
        horario: [
            { dia: 'Viernes', horaInicio: '11:00', horaFin: '13:00' }
        ],
        aula: 'LAB-202',
        cupo: 28,
        cantidadMatriculados: 0,
        estado: 'activo'
    }
];

const usuariosData = [
    {
        nombres: 'Edwar Javier',
        apellidos: 'Valeriano Aviles',
        correo: 'edwar.valeriano@unah.edu.hn',
        numeroCuenta: '20231004512',
        contraseñaHash: '$2b$10$hashSimuladoAlumno001',
        carreraCodigo: 'IS-01',
        rol: 'alumno',
        asignaturasAprobadasCodigo: ['PRG-102'],
        estado: 'activo'
    },
    {
        nombres: 'Valeria Nicole',
        apellidos: 'Pineda Suazo',
        correo: 'valeria.pineda@unah.edu.hn',
        numeroCuenta: '20231008891',
        contraseñaHash: '$2b$10$hashSimuladoAlumno002',
        carreraCodigo: 'IS-01',
        rol: 'alumno',
        asignaturasAprobadasCodigo: ['PRG-102', 'BD-201'],
        estado: 'activo'
    },
    {
        nombres: 'Carlos Eduardo',
        apellidos: 'Mendoza Lagos',
        correo: 'carlos.mendoza@unah.edu.hn',
        numeroCuenta: '20192001120',
        contraseñaHash: '$2b$10$hashSimuladoDocente001',
        carreraCodigo: 'IS-01',
        rol: 'docente',
        asignaturasAprobadasCodigo: [],
        estado: 'activo'
    },
    {
        nombres: 'Andrea Marcela',
        apellidos: 'Reyes Dubón',
        correo: 'andrea.reyes@unah.edu.hn',
        numeroCuenta: '20241003345',
        contraseñaHash: '$2b$10$hashSimuladoAlumno003',
        carreraCodigo: 'AD-01',
        rol: 'alumno',
        asignaturasAprobadasCodigo: [],
        estado: 'activo'
    },
    {
        nombres: 'Administrador',
        apellidos: 'Registro Académico',
        correo: 'admin.matricula@unah.edu.hn',
        numeroCuenta: '20001000001',
        contraseñaHash: '$2b$10$hashSimuladoAdmin001',
        carreraCodigo: 'IS-01',
        rol: 'admin',
        asignaturasAprobadasCodigo: [],
        estado: 'activo'
    }
];

// Usa updateOne con upsert: true para no fallar si ya existen algunos documentos
const upsertLote = async (Model, items, construirFiltro) => {
    let procesados = 0;
    for (const item of items) {
        const filtro = construirFiltro(item);
        await Model.updateOne(
            filtro,
            { $setOnInsert: item },
            { upsert: true, runValidators: true }
        );
        procesados++;
    }
    return procesados;
};

const runSeed = async () => {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
        throw new Error('No se encontró MONGODB_URI ni MONGO_URI en el archivo .env');
    }

    await mongoose.connect(uri);
    console.log('Conectado a MongoDB para ejecutar seed...');

    const totalCarreras = await upsertLote(Carrera, carrerasData, (c) => ({ codigo: c.codigo }));
    console.log(`Carreras procesadas: ${totalCarreras}`);

    const totalAsignaturas = await upsertLote(Asignatura, asignaturasData, (a) => ({ codigo: a.codigo }));
    console.log(`Asignaturas procesadas: ${totalAsignaturas}`);

    const totalPeriodos = await upsertLote(Periodo, periodosData, (p) => ({ nombre: p.nombre }));
    console.log(`Períodos procesados: ${totalPeriodos}`);

    const totalSecciones = await upsertLote(Seccion, seccionesData, (s) => ({
        periodoNombre: s.periodoNombre,
        asignaturaCodigo: s.asignaturaCodigo,
        codigoSeccion: s.codigoSeccion
    }));
    console.log(`Secciones procesadas: ${totalSecciones}`);

    const totalUsuarios = await upsertLote(Usuario, usuariosData, (u) => ({ numeroCuenta: u.numeroCuenta }));
    console.log(`Usuarios procesados: ${totalUsuarios}`);

    console.log('Seed completado con éxito.');
};

runSeed()
    .catch((err) => {
        console.error('Error ejecutando seed:', err);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });