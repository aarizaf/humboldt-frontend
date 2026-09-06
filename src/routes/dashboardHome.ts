import type { UserRole } from '../types/dashboard';

export function homeForRole(role: UserRole): string {
  switch (role) {
    case 'profesor':
      return '/dashboard/materias';
    case 'admin':
      return '/dashboard/horarios';
    case 'estudiante':
    default:
      return '/dashboard/materias';
  }
}
