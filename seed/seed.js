require('dotenv').config();
const mongoose = require('mongoose');
const conectarDB = require('../config/database');

const Career = require('../models/Careers');
const User = require('../models/Users');
const Subject = require('../models/Subjects');
const Period = require('../models/Periods');
const Section = require('../models/Sections');
const Enrollment = require('../models/Enrollments');
const EnrollmentEvent = require('../models/EnrollmentEvents');

const poblarBaseDeDatos = async () => {
  try {
    await conectarDB();

    await Promise.all([
      EnrollmentEvent.deleteMany({}),
      Enrollment.deleteMany({}),
      Section.deleteMany({}),
      Subject.deleteMany({}),
      Period.deleteMany({}),
      User.deleteMany({}),
      Career.deleteMany({})
    ]);

    // 1. Carreras (2 registros)
    const carreras = await Career.create([
      {
        name: 'Ingeniería en Sistemas',
        code: 'IS-01',
        description: 'Desarrollo de software, bases de datos y redes.',
        maxCredits: 18,
        status: 'active'
      },
      {
        name: 'Administración de Empresas',
        code: 'AE-02',
        description: 'Gestión empresarial, finanzas y contabilidad.',
        maxCredits: 18,
        status: 'active'
      }
    ]);

    const carreraSistemas = carreras[0];
    const carreraAdmin = carreras[1];

    // 2. Períodos académicos (2 registros)
    const periodos = await Period.create([
      {
        name: 'III Período 2026',
        startDate: new Date('2026-09-01'),
        enrollmentStart: new Date('2026-08-20'),
        enrollmentEnd: new Date('2026-12-10'),
        withdrawalDeadline: new Date('2026-11-30'),
        status: 'open'
      },
      {
        name: 'I Período 2027',
        startDate: new Date('2027-01-15'),
        enrollmentStart: new Date('2027-01-05'),
        enrollmentEnd: new Date('2027-02-05'),
        withdrawalDeadline: new Date('2027-03-15'),
        status: 'closed'
      }
    ]);

    const periodoActual = periodos[0];

    // 3. Asignaturas (6 registros)
    const asignaturas = await Subject.create([
      {
        code: 'INF-201',
        name: 'Programación I',
        credits: 4,
        description: 'Lógica y programación básica.',
        prerequisiteIds: [],
        careerId: carreraSistemas._id,
        status: 'active'
      },
      {
        code: 'INF-301',
        name: 'Programación Web II',
        credits: 4,
        description: 'Aplicaciones web y servicios.',
        prerequisiteIds: [],
        careerId: carreraSistemas._id,
        status: 'active'
      },
      {
        code: 'INF-322',
        name: 'Bases de Datos II',
        credits: 4,
        description: 'Consultas avanzadas y administración.',
        prerequisiteIds: [],
        careerId: carreraSistemas._id,
        status: 'active'
      },
      {
        code: 'MAT-210',
        name: 'Matemática Discreta',
        credits: 4,
        description: 'Lógica, conjuntos y grafos.',
        prerequisiteIds: [],
        careerId: carreraSistemas._id,
        status: 'active'
      },
      {
        code: 'ADM-101',
        name: 'Principios de Administración',
        credits: 3,
        description: 'Planeación y organización empresarial.',
        prerequisiteIds: [],
        careerId: carreraAdmin._id,
        status: 'active'
      },
      {
        code: 'CON-201',
        name: 'Contabilidad Gerencial',
        credits: 4,
        description: 'Análisis de costos y presupuestos.',
        prerequisiteIds: [],
        careerId: carreraAdmin._id,
        status: 'active'
      }
    ]);

    const [asigProg1, asigWeb2, asigBD2, asigMat, asigAdm, asigCon] = asignaturas;

    // 4. Usuarios (5 registros)
    const usuarios = await User.create([
      {
        firstName: 'Ana',
        lastName: 'Martínez',
        email: 'ana.martinez@unah.edu.hn',
        accountNumber: '20241001',
        passwordHash: 'Estudiante123',
        careerId: carreraSistemas._id,
        role: 'student',
        completedSubjectIds: [asigProg1._id],
        status: 'active'
      },
      {
        firstName: 'Luis',
        lastName: 'Pineda',
        email: 'luis.pineda@unah.edu.hn',
        accountNumber: '20241002',
        passwordHash: 'Estudiante123',
        careerId: carreraSistemas._id,
        role: 'student',
        completedSubjectIds: [],
        status: 'active'
      },
      {
        firstName: 'Sofía',
        lastName: 'Flores',
        email: 'sofia.flores@unah.edu.hn',
        accountNumber: '20241003',
        passwordHash: 'Estudiante123',
        careerId: carreraSistemas._id,
        role: 'student',
        completedSubjectIds: [asigProg1._id],
        status: 'active'
      },
      {
        firstName: 'Diego',
        lastName: 'Valladares',
        email: 'diego.valladares@unah.edu.hn',
        accountNumber: '20242001',
        passwordHash: 'Estudiante123',
        careerId: carreraAdmin._id,
        role: 'student',
        completedSubjectIds: [],
        status: 'active'
      },
      {
        firstName: 'Carlos',
        lastName: 'Reyes',
        email: 'admin.academico@unah.edu.hn',
        accountNumber: '0001',
        passwordHash: 'Admin123',
        careerId: carreraSistemas._id,
        role: 'admin',
        completedSubjectIds: [],
        status: 'active'
      }
    ]);

    const [estAna, estLuis, estSofia, estDiego, adminCarlos] = usuarios;

    // 5. Secciones (6 registros)
    const secciones = await Section.create([
      {
        subjectId: asigWeb2._id,
        periodId: periodoActual._id,
        sectionCode: '0800',
        teacherName: 'Ing. Roberto Díaz',
        schedule: [
          { day: 'LUN', startTime: '08:00', endTime: '09:30' },
          { day: 'MIE', startTime: '08:00', endTime: '09:30' }
        ],
        classroom: 'B1-201',
        capacity: 30,
        enrolledCount: 2,
        status: 'active'
      },
      {
        subjectId: asigBD2._id,
        periodId: periodoActual._id,
        sectionCode: '1000',
        teacherName: 'Ing. Lucía Mendoza',
        schedule: [
          { day: 'MAR', startTime: '10:00', endTime: '11:30' },
          { day: 'JUE', startTime: '10:00', endTime: '11:30' }
        ],
        classroom: 'LAB-2',
        capacity: 25,
        enrolledCount: 1,
        status: 'active'
      },
      {
        subjectId: asigMat._id,
        periodId: periodoActual._id,
        sectionCode: '1300',
        teacherName: 'Lic. Elena Castro',
        schedule: [
          { day: 'LUN', startTime: '13:00', endTime: '14:30' },
          { day: 'MIE', startTime: '13:00', endTime: '14:30' }
        ],
        classroom: 'A1-302',
        capacity: 30,
        enrolledCount: 1,
        status: 'active'
      },
      {
        subjectId: asigWeb2._id,
        periodId: periodoActual._id,
        sectionCode: '1500',
        teacherName: 'Ing. Mario Paz',
        schedule: [
          { day: 'MAR', startTime: '15:00', endTime: '16:30' },
          { day: 'JUE', startTime: '15:00', endTime: '16:30' }
        ],
        classroom: 'B2-105',
        capacity: 20,
        enrolledCount: 0,
        status: 'active'
      },
      {
        subjectId: asigAdm._id,
        periodId: periodoActual._id,
        sectionCode: '0900',
        teacherName: 'Lic. Martha Zelaya',
        schedule: [
          { day: 'LUN', startTime: '09:00', endTime: '10:30' },
          { day: 'MIE', startTime: '09:00', endTime: '10:30' }
        ],
        classroom: 'C1-102',
        capacity: 35,
        enrolledCount: 1,
        status: 'active'
      },
      {
        subjectId: asigCon._id,
        periodId: periodoActual._id,
        sectionCode: '1100',
        teacherName: 'Lic. Jorge Mejía',
        schedule: [
          { day: 'MAR', startTime: '11:00', endTime: '12:30' },
          { day: 'JUE', startTime: '11:00', endTime: '12:30' }
        ],
        classroom: 'C1-204',
        capacity: 30,
        enrolledCount: 0,
        status: 'active'
      }
    ]);

    const [secWeb0800, secBD1000, secMat1300, secWeb1500, secAdm0900] = secciones;

    // 6. Matrículas (3 registros)
    const matriculas = await Enrollment.create([
      {
        enrollmentCode: 'MAT-2026-001',
        studentId: estAna._id,
        periodId: periodoActual._id,
        status: 'CONFIRMED',
        totalCredits: 8,
        subjects: [
          {
            sectionId: secWeb0800._id,
            subjectId: asigWeb2._id,
            credits: 4,
            status: 'ACTIVE'
          },
          {
            sectionId: secBD1000._id,
            subjectId: asigBD2._id,
            credits: 4,
            status: 'ACTIVE'
          }
        ]
      },
      {
        enrollmentCode: 'MAT-2026-002',
        studentId: estLuis._id,
        periodId: periodoActual._id,
        status: 'CONFIRMED',
        totalCredits: 4,
        subjects: [
          {
            sectionId: secMat1300._id,
            subjectId: asigMat._id,
            credits: 4,
            status: 'ACTIVE'
          }
        ]
      },
      {
        enrollmentCode: 'MAT-2026-003',
        studentId: estDiego._id,
        periodId: periodoActual._id,
        status: 'CONFIRMED',
        totalCredits: 3,
        subjects: [
          {
            sectionId: secAdm0900._id,
            subjectId: asigAdm._id,
            credits: 3,
            status: 'ACTIVE'
          }
        ]
      }
    ]);

    const [matAna, matLuis, matDiego] = matriculas;

    // 7. Eventos de matrícula (2 registros)
    await EnrollmentEvent.create([
      {
        enrollmentId: matAna._id,
        studentId: estAna._id,
        sectionId: secWeb0800._id,
        action: 'ENROLL',
        reason: 'Matrícula inicial de prueba',
        performedBy: adminCarlos._id
      },
      {
        enrollmentId: matLuis._id,
        studentId: estLuis._id,
        sectionId: secMat1300._id,
        action: 'ENROLL',
        reason: 'Matrícula inicial de prueba',
        performedBy: adminCarlos._id
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