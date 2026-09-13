import type {
  Actividad,
  ActividadConEntrega,
  Curso,
  Estudiante,
  EntregaActividad,
  Materia,
  MateriaConPendientes,
  Profesor,
} from '../types/dashboard';
import {
  SEED_ACTIVIDADES,
  SEED_CURSOS,
  SEED_ENTREGAS,
  SEED_ESTUDIANTES,
  SEED_MATERIAS,
  SEED_PROFESORES,
} from '../mocks/schoolData';

const STORAGE_KEY = 'humboldt.schoolData.v2';

interface SchoolDataStore {
  cursos: Curso[];
  profesores: Profesor[];
  estudiantes: Estudiante[];
  materias: Materia[];
  actividades: Actividad[];
  entregas: EntregaActividad[];
}

function loadStore(): SchoolDataStore {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    return JSON.parse(raw) as SchoolDataStore;
  }
  const seeded: SchoolDataStore = {
    cursos: SEED_CURSOS,
    profesores: SEED_PROFESORES,
    estudiantes: SEED_ESTUDIANTES,
    materias: SEED_MATERIAS,
    actividades: SEED_ACTIVIDADES,
    entregas: SEED_ENTREGAS,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveStore(store: SchoolDataStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export async function getMateriasConPendientesByEstudiante(
  estudianteId: string
): Promise<MateriaConPendientes[]> {
  const store = loadStore();

  return store.materias.map((materia) => {
    const actividadesDeLaMateria = store.actividades.filter((a) => a.materiaId === materia.id);
    const pendientes = actividadesDeLaMateria.filter((actividad) => {
      const entrega = store.entregas.find(
        (e) => e.actividadId === actividad.id && e.estudianteId === estudianteId
      );
      return !entrega || entrega.estado === 'pendiente';
    }).length;

    return { ...materia, pendientes };
  });
}

export async function getActividadesByMateriaForEstudiante(
  materiaId: string,
  estudianteId: string
): Promise<ActividadConEntrega[]> {
  const store = loadStore();

  return store.actividades
    .filter((actividad) => actividad.materiaId === materiaId)
    .map((actividad) => {
      const entrega =
        store.entregas.find(
          (e) => e.actividadId === actividad.id && e.estudianteId === estudianteId
        ) ?? null;
      return { ...actividad, entrega };
    })
    .sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite));
}

export async function getMateriasByProfesor(profesorId: string): Promise<Materia[]> {
  const store = loadStore();
  return store.materias.filter((materia) => materia.profesorId === profesorId);
}

export async function getMateriaById(materiaId: string): Promise<Materia | undefined> {
  const store = loadStore();
  return store.materias.find((m) => m.id === materiaId);
}

export async function submitActividad(
  actividadId: string,
  estudianteId: string,
  respuestaTexto: string
): Promise<EntregaActividad> {
  const store = loadStore();
  const existente = store.entregas.find(
    (e) => e.actividadId === actividadId && e.estudianteId === estudianteId
  );

  const entrega: EntregaActividad = existente
    ? { ...existente, estado: 'entregada', respuestaTexto, fechaEntrega: new Date().toISOString() }
    : {
        id: `entrega-${actividadId}-${estudianteId}`,
        actividadId,
        estudianteId,
        estado: 'entregada',
        respuestaTexto,
        fechaEntrega: new Date().toISOString(),
      };

  store.entregas = existente
    ? store.entregas.map((e) => (e.id === entrega.id ? entrega : e))
    : [...store.entregas, entrega];

  saveStore(store);
  return entrega;
}

// --- Administración: cursos, estudiantes, profesores y materias ---

const MATERIA_IMAGEN_DEFAULT =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80';

export async function getCursos(): Promise<Curso[]> {
  const store = loadStore();
  return store.cursos;
}

export async function getProfesores(): Promise<Profesor[]> {
  const store = loadStore();
  return store.profesores;
}

export async function getEstudiantes(): Promise<Estudiante[]> {
  const store = loadStore();
  return store.estudiantes;
}

export async function getMaterias(): Promise<Materia[]> {
  const store = loadStore();
  return store.materias;
}

export async function getMateriasByCurso(cursoId: string): Promise<Materia[]> {
  const store = loadStore();
  return store.materias.filter((materia) => materia.cursoId === cursoId);
}

export async function assignEstudianteACurso(
  estudianteId: string,
  cursoId: string | null
): Promise<Estudiante> {
  const store = loadStore();
  const estudiante = store.estudiantes.find((e) => e.id === estudianteId);
  if (!estudiante) {
    throw new Error('Estudiante no encontrado');
  }

  const actualizado: Estudiante = { ...estudiante, cursoId };
  store.estudiantes = store.estudiantes.map((e) => (e.id === estudianteId ? actualizado : e));
  saveStore(store);
  return actualizado;
}

export async function crearMateriaParaCurso(nombre: string, cursoId: string): Promise<Materia> {
  const store = loadStore();
  const curso = store.cursos.find((c) => c.id === cursoId);
  if (!curso) {
    throw new Error('Curso no encontrado');
  }

  const materia: Materia = {
    id: `materia-${Date.now()}`,
    nombre,
    cursoId: curso.id,
    cursoNombre: curso.nombre,
    profesorId: null,
    profesorNombre: null,
    imagenUrl: MATERIA_IMAGEN_DEFAULT,
  };

  store.materias = [...store.materias, materia];
  saveStore(store);
  return materia;
}

export async function eliminarMateria(materiaId: string): Promise<void> {
  const store = loadStore();
  store.materias = store.materias.filter((m) => m.id !== materiaId);
  saveStore(store);
}

export async function asignarProfesorAMateria(
  materiaId: string,
  profesorId: string | null
): Promise<Materia> {
  const store = loadStore();
  const materia = store.materias.find((m) => m.id === materiaId);
  if (!materia) {
    throw new Error('Materia no encontrada');
  }

  const profesor = profesorId ? store.profesores.find((p) => p.id === profesorId) : undefined;
  const actualizado: Materia = {
    ...materia,
    profesorId: profesorId,
    profesorNombre: profesor ? profesor.nombre : null,
  };

  store.materias = store.materias.map((m) => (m.id === materiaId ? actualizado : m));
  saveStore(store);
  return actualizado;
}
