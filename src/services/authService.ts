import type { LoginCredentials, RegisterCredentials, RegisterApiResponse } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

interface AuthResponse {
  success: boolean;
  message: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // TODO: Implementar autenticación real contra el backend
  console.log('Login attempt:', credentials);
  return { success: true, message: 'Inicio de sesión exitoso' };
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
