import type { Actividad, Curso, EntregaActividad, Materia } from '../types/dashboard';

export const ESTUDIANTE_DEMO_ID = 'estudiante1';

export const SEED_CURSOS: Curso[] = [
  { id: 'curso-10a', nombre: '10-A' },
  { id: 'curso-11a', nombre: '11-A' },
];

export const SEED_MATERIAS: Materia[] = [
  {
    id: 'materia-matematicas',
    nombre: 'Matemáticas',
    cursoId: 'curso-10a',
    cursoNombre: '10-A',
    profesorId: 'profesor1',
    profesorNombre: 'Prof. Camilo Ríos',
    imagenUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'materia-ciencias',
    nombre: 'Ciencias Naturales',
    cursoId: 'curso-10a',
    cursoNombre: '10-A',
    profesorId: 'profesor1',
    profesorNombre: 'Prof. Camilo Ríos',
    imagenUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'materia-ingles',
    nombre: 'Inglés',
    cursoId: 'curso-10a',
    cursoNombre: '10-A',
    profesorId: 'profesor2',
    profesorNombre: 'Prof. Laura Gómez',
    imagenUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'materia-sociales',
    nombre: 'Ciencias Sociales',
    cursoId: 'curso-10a',
    cursoNombre: '10-A',
    profesorId: 'profesor2',
    profesorNombre: 'Prof. Laura Gómez',
    imagenUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
  },
];

export const SEED_ACTIVIDADES: Actividad[] = [
  {
    id: 'act-mate-1',
    materiaId: 'materia-matematicas',
    titulo: 'Taller de ecuaciones cuadráticas',
    descripcion: 'Resolver los 10 ejercicios de la guía 4 y enviar el procedimiento completo.',
    fechaLimite: '2026-09-10',
  },
  {
    id: 'act-mate-2',
    materiaId: 'materia-matematicas',
    titulo: 'Quiz de funciones',
    descripcion: 'Quiz corto sobre funciones lineales y cuadráticas.',
    fechaLimite: '2026-08-20',
  },
  {
    id: 'act-ciencias-1',
    materiaId: 'materia-ciencias',
    titulo: 'Informe de laboratorio: fotosíntesis',
    descripcion: 'Redactar el informe siguiendo el formato entregado en clase.',
    fechaLimite: '2026-09-15',
  },
  {
    id: 'act-ingles-1',
    materiaId: 'materia-ingles',
    titulo: 'Essay: My future plans',
    descripcion: 'Escribir un ensayo de mínimo 200 palabras sobre tus planes a futuro.',
    fechaLimite: '2026-09-05',
  },
  {
    id: 'act-sociales-1',
    materiaId: 'materia-sociales',
    titulo: 'Mapa conceptual: Revolución Industrial',
    descripcion: 'Elaborar un mapa conceptual con las causas y consecuencias principales.',
    fechaLimite: '2026-08-25',
  },
];

export const SEED_ENTREGAS: EntregaActividad[] = [
  {
    id: 'entrega-mate-2',
    actividadId: 'act-mate-2',
    estudianteId: ESTUDIANTE_DEMO_ID,
    estado: 'calificada',
    respuestaTexto: 'Quiz resuelto y enviado a tiempo.',
    fechaEntrega: '2026-08-19',
    calificacion: 4.5,
  },
  {
    id: 'entrega-ingles-1',
    actividadId: 'act-ingles-1',
    estudianteId: ESTUDIANTE_DEMO_ID,
    estado: 'entregada',
    respuestaTexto: 'Essay enviado, pendiente de revisión del profesor.',
    fechaEntrega: '2026-09-03',
  },
];
