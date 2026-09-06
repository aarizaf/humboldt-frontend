import type { IconType } from 'react-icons';
import { FiBookOpen, FiCheckSquare, FiCalendar, FiBarChart2, FiUsers } from 'react-icons/fi';
import type { UserRole } from '../types/dashboard';

export interface DashboardNavItem {
  label: string;
  to: string;
  roles: UserRole[];
  icon: IconType;
}

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { label: 'Mis cursos', to: '/dashboard/materias', roles: ['estudiante', 'profesor'], icon: FiBookOpen },
  { label: 'Asistencia', to: '/dashboard/asistencia', roles: ['profesor'], icon: FiCheckSquare },
  { label: 'Horarios', to: '/dashboard/horarios', roles: ['admin'], icon: FiCalendar },
  { label: 'Reportes', to: '/dashboard/reportes', roles: ['admin'], icon: FiBarChart2 },
  { label: 'Asignaciones', to: '/dashboard/asignaciones', roles: ['admin'], icon: FiUsers },
];
