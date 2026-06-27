import type { LoginCredentials } from '../types';

interface AuthResponse {
  success: boolean;
  message: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // TODO: Implementar autenticación real contra el backend
  console.log('Login attempt:', credentials);
  return { success: true, message: 'Inicio de sesión exitoso' };
}
