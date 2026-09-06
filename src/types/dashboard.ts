export type UserRole = 'estudiante' | 'profesor' | 'admin';

export interface AuthUser {
  id: string;
  username: string;
  nombre: string;
  role: UserRole;
}

export interface Curso {
  id: string;
  nombre: string;
}

export interface Materia {
  id: string;
  nombre: string;
  cursoId: string;
  cursoNombre: string;
  profesorId: string;
  profesorNombre: string;
  imagenUrl: string;
}

export interface MateriaConPendientes extends Materia {
  pendientes: number;
}

export type ActividadEstado = 'pendiente' | 'entregada' | 'calificada';

export interface Actividad {
  id: string;
  materiaId: string;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
}

export interface EntregaActividad {
  id: string;
  actividadId: string;
  estudianteId: string;
  estado: ActividadEstado;
  respuestaTexto?: string;
  fechaEntrega?: string;
  calificacion?: number;
}

export interface ActividadConEntrega extends Actividad {
  entrega: EntregaActividad | null;
}
