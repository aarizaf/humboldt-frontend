import type { UserRole } from './dashboard';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  nombre: string;        // nombre completo (nombre + apellido combinados)
  identificacion: string;
  password: string;
  correo: string;
  usuario: Exclude<UserRole, 'admin'>;
}

export interface RegisterApiResponse {
  success: boolean;
  info_clte?: Array<{
    identificacion: string;
    nombre: string;
    password: string;
    correo: string;
  }>;
}
