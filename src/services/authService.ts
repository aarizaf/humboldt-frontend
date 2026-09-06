import type { LoginCredentials, RegisterCredentials, RegisterApiResponse } from '../types';
import type { UserRole } from '../types/dashboard';

const API_URL = process.env.REACT_APP_API_URL;

interface AuthResponse {
  success: boolean;
  message: string;
  role?: UserRole;
}

function inferRoleFromUsername(username: string): UserRole {
  const normalized = username.trim().toLowerCase();
  if (normalized.includes('admin')) return 'admin';
  if (normalized.includes('profesor')) return 'profesor';
  return 'estudiante';
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // TODO: Implementar autenticación real contra el backend.
  // Mientras tanto, el rol se infiere del username (ver usuarios demo: estudiante1, profesor1, admin1).
  return {
    success: true,
    message: 'Inicio de sesión exitoso',
    role: inferRoleFromUsername(credentials.username),
  };
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/SaberResults/crearUsuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    return { success: false, message: `Error del servidor: ${response.status}` };
  }

  const data: RegisterApiResponse = await response.json();
  return {
    success: data.success === true,
    message: data.success ? 'Registro exitoso' : 'No se pudo completar el registro',
  };
}
