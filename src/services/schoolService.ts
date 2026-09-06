import type {
  Actividad,
  ActividadConEntrega,
  EntregaActividad,
  Materia,
  MateriaConPendientes,
} from '../types/dashboard';
import { SEED_ACTIVIDADES, SEED_ENTREGAS, SEED_MATERIAS } from '../mocks/schoolData';

const STORAGE_KEY = 'humboldt.schoolData.v1';

interface SchoolDataStore {
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
