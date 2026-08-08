export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  nombre: string;        // nombre completo (nombre + apellido combinados)
  identificacion: string;
  password: string;
  correo: string;
  usuario: 'profesor' | 'estudiante';
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
