require('dotenv').config();
const mongoose = require('mongoose');
const conectarDB = require('../config/database');

const Carrera = require('../models/Carreras');
const Usuario = require('../models/Usuarios');
const Asignatura = require('../models/Asignaturas');
const Periodo = require('../models/Periodos');
const Seccion = require('../models/Secciones');
const Matricula = require('../models/Matriculas');
const EventoMatricula = require('../models/EventosMatricula');

const poblarBaseDeDatos = async () => {
  try {
    await conectarDB();

    await Promise.all([
      EventoMatricula.deleteMany({}),
      Matricula.deleteMany({}),
      Seccion.deleteMany({}),
      Asignatura.deleteMany({}),
      Periodo.deleteMany({}),
      Usuario.deleteMany({}),
      Carrera.deleteMany({})
    ]);

    // 1. Carreras (2 registros)
    const carreras = await Carrera.create([
      {
        nombre: 'Ingeniería en Sistemas',
        codigo: 'IS-01',
        descripcion: 'Desarrollo de software, bases de datos y redes.',
        maximoCreditos: 18,
        estado: 'activo'
      },
      {
        nombre: 'Administración de Empresas',
        codigo: 'AE-02',
        descripcion: 'Gestión empresarial, finanzas y contabilidad.',
        maximoCreditos: 18,
        estado: 'activo'
      }
    ]);

    const carreraSistemas = carreras[0];
    const carreraAdmin = carreras[1];

    // 2. Períodos académicos (2 registros)
    const periodos = await Periodo.create([
      {
        nombre: 'III Período 2026',
        fechaInicio: new Date('2026-09-01'),
        inicioMatricula: new Date('2026-08-20'),
        finMatricula: new Date('2026-12-10'),
        fechaLimiteCancelacion: new Date('2026-11-30'),
        estado: 'abierto'
      },
      {
        nombre: 'I Período 2027',
        fechaInicio: new Date('2027-01-15'),
        inicioMatricula: new Date('2027-01-05'),
        finMatricula: new Date('2027-02-05'),
        fechaLimiteCancelacion: new Date('2027-03-15'),
        estado: 'cerrado'
      }
    ]);

    const periodoActual = periodos[0];

    // 3. Asignaturas (6 registros)
    const asignaturas = await Asignatura.create([
      {
        codigo: 'INF-201',
        nombre: 'Programación I',
        creditos: 4,
        descripcion: 'Lógica y programación básica.',
        prerrequisitosIds: [],
        carreraId: carreraSistemas._id,
        estado: 'activo'
      },
      {
        codigo: 'INF-301',
        nombre: 'Programación Web II',
        creditos: 4,
        descripcion: 'Aplicaciones web y servicios.',
        prerrequisitosIds: [],
        carreraId: carreraSistemas._id,
        estado: 'activo'
      },
      {
        codigo: 'INF-322',
        nombre: 'Bases de Datos II',
        creditos: 4,
        descripcion: 'Consultas avanzadas y administración.',
        prerrequisitosIds: [],
        carreraId: carreraSistemas._id,
        estado: 'activo'
      },
      {
        codigo: 'MAT-210',
        nombre: 'Matemática Discreta',
        creditos: 4,
        descripcion: 'Lógica, conjuntos y grafos.',
        prerrequisitosIds: [],
        carreraId: carreraSistemas._id,
        estado: 'activo'
      },
      {
        codigo: 'ADM-101',
        nombre: 'Principios de Administración',
        creditos: 3,
        descripcion: 'Planeación y organización empresarial.',
        prerrequisitosIds: [],
        carreraId: carreraAdmin._id,
        estado: 'activo'
      },
      {
        codigo: 'CON-201',
        nombre: 'Contabilidad Gerencial',
        creditos: 4,
        descripcion: 'Análisis de costos y presupuestos.',
        prerrequisitosIds: [],
        carreraId: carreraAdmin._id,
        estado: 'activo'
      }
    ]);

    const [asigProg1, asigWeb2, asigBD2, asigMat, asigAdm, asigCon] = asignaturas;

    // 4. Usuarios (5 registros)
    const usuarios = await Usuario.create([
      {
        nombres: 'Ana',
        apellidos: 'Martínez',
        correo: 'ana.martinez@unah.edu.hn',
        numeroCuenta: '20241001',
        contrasenaHash: 'Estudiante123',
        carreraId: carreraSistemas._id,
        rol: 'alumno',
        clasesAprobadasIds: [asigProg1._id],
        estado: 'activo'
      },
      {
        nombres: 'Luis',
        apellidos: 'Pineda',
        correo: 'luis.pineda@unah.edu.hn',
        numeroCuenta: '20241002',
        contrasenaHash: 'Estudiante123',
        carreraId: carreraSistemas._id,
        rol: 'alumno',
        clasesAprobadasIds: [],
        estado: 'activo'
      },
      {
        nombres: 'Sofía',
        apellidos: 'Flores',
        correo: 'sofia.flores@unah.edu.hn',
        numeroCuenta: '20241003',
        contrasenaHash: 'Estudiante123',
        carreraId: carreraSistemas._id,
        rol: 'alumno',
        clasesAprobadasIds: [asigProg1._id],
        estado: 'activo'
      },
      {
        nombres: 'Diego',
        apellidos: 'Valladares',
        correo: 'diego.valladares@unah.edu.hn',
        numeroCuenta: '20242001',
        contrasenaHash: 'Estudiante123',
        carreraId: carreraAdmin._id,
        rol: 'alumno',
        clasesAprobadasIds: [],
        estado: 'activo'
      },
      {
        nombres: 'Carlos',
        apellidos: 'Reyes',
        correo: 'admin.academico@unah.edu.hn',
        numeroCuenta: '0001',
        contrasenaHash: 'Admin123',
        carreraId: carreraSistemas._id,
        rol: 'admin',
        clasesAprobadasIds: [],
        estado: 'activo'
      }
    ]);

    const [estAna, estLuis, estSofia, estDiego, adminCarlos] = usuarios;

    // 5. Secciones (6 registros)
    const secciones = await Seccion.create([
      {
        asignaturaId: asigWeb2._id,
        periodoId: periodoActual._id,
        codigoSeccion: '0800',
        nombreDocente: 'Ing. Roberto Díaz',
        horario: [
          { dia: 'LUN', horaInicio: '08:00', horaFin: '09:30' },
          { dia: 'MIE', horaInicio: '08:00', horaFin: '09:30' }
        ],
        aula: 'B1-201',
        cupo: 30,
        cantidadMatriculados: 2,
        estado: 'activo'
      },
      {
        asignaturaId: asigBD2._id,
        periodoId: periodoActual._id,
        codigoSeccion: '1000',
        nombreDocente: 'Ing. Lucía Mendoza',
        horario: [
          { dia: 'MAR', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'JUE', horaInicio: '10:00', horaFin: '11:30' }
        ],
        aula: 'LAB-2',
        cupo: 25,
        cantidadMatriculados: 1,
        estado: 'activo'
      },
      {
        asignaturaId: asigMat._id,
        periodoId: periodoActual._id,
        codigoSeccion: '1300',
        nombreDocente: 'Lic. Elena Castro',
        horario: [
          { dia: 'LUN', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'MIE', horaInicio: '13:00', horaFin: '14:30' }
        ],
        aula: 'A1-302',
        cupo: 30,
        cantidadMatriculados: 1,
        estado: 'activo'
      },
      {
        asignaturaId: asigWeb2._id,
        periodoId: periodoActual._id,
        codigoSeccion: '1500',
        nombreDocente: 'Ing. Mario Paz',
        horario: [
          { dia: 'MAR', horaInicio: '15:00', horaFin: '16:30' },
          { dia: 'JUE', horaInicio: '15:00', horaFin: '16:30' }
        ],
        aula: 'B2-105',
        cupo: 20,
        cantidadMatriculados: 0,
        estado: 'activo'
      },
      {
        asignaturaId: asigAdm._id,
        periodoId: periodoActual._id,
        codigoSeccion: '0900',
        nombreDocente: 'Lic. Martha Zelaya',
        horario: [
          { dia: 'LUN', horaInicio: '09:00', horaFin: '10:30' },
          { dia: 'MIE', horaInicio: '09:00', horaFin: '10:30' }
        ],
        aula: 'C1-102',
        cupo: 35,
        cantidadMatriculados: 1,
        estado: 'activo'
      },
      {
        asignaturaId: asigCon._id,
        periodoId: periodoActual._id,
        codigoSeccion: '1100',
        nombreDocente: 'Lic. Jorge Mejía',
        horario: [
          { dia: 'MAR', horaInicio: '11:00', horaFin: '12:30' },
          { dia: 'JUE', horaInicio: '11:00', horaFin: '12:30' }
        ],
        aula: 'C1-204',
        cupo: 30,
        cantidadMatriculados: 0,
        estado: 'activo'
      }
    ]);

    const [secWeb0800, secBD1000, secMat1300, secWeb1500, secAdm0900] = secciones;

    // 6. Matrículas (3 registros)
    const matriculas = await Matricula.create([
      {
        codigoMatricula: 'MAT-2026-001',
        alumnoId: estAna._id,
        periodoId: periodoActual._id,
        estado: 'CONFIRMADA',
        totalCreditos: 8,
        asignaturas: [
          {
            seccionId: secWeb0800._id,
            asignaturaId: asigWeb2._id,
            creditos: 4,
            estado: 'ACTIVA'
          },
          {
            seccionId: secBD1000._id,
            asignaturaId: asigBD2._id,
            creditos: 4,
            estado: 'ACTIVA'
          }
        ]
      },
      {
        codigoMatricula: 'MAT-2026-002',
        alumnoId: estLuis._id,
        periodoId: periodoActual._id,
        estado: 'CONFIRMADA',
        totalCreditos: 4,
        asignaturas: [
          {
            seccionId: secMat1300._id,
            asignaturaId: asigMat._id,
            creditos: 4,
            estado: 'ACTIVA'
          }
        ]
      },
      {
        codigoMatricula: 'MAT-2026-003',
        alumnoId: estDiego._id,
        periodoId: periodoActual._id,
        estado: 'CONFIRMADA',
        totalCreditos: 3,
        asignaturas: [
          {
            seccionId: secAdm0900._id,
            asignaturaId: asigAdm._id,
            creditos: 3,
            estado: 'ACTIVA'
          }
        ]
      }
    ]);

    const [matAna, matLuis, matDiego] = matriculas;

    // 7. Eventos de matrícula (2 registros)
    await EventoMatricula.create([
      {
        matriculaId: matAna._id,
        alumnoId: estAna._id,
        seccionId: secWeb0800._id,
        accion: 'MATRICULAR',
        motivo: 'Matrícula inicial de prueba',
        realizadoPor: adminCarlos._id
      },
      {
        matriculaId: matLuis._id,
        alumnoId: estLuis._id,
        seccionId: secMat1300._id,
        accion: 'MATRICULAR',
        motivo: 'Matrícula inicial de prueba',
        realizadoPor: adminCarlos._id
      }
    ]);

    console.log('Seed completado con 26 registros de prueba.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar el seed:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

poblarBaseDeDatos();