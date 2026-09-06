import type { IconType } from 'react-icons';
import { FiBookOpen, FiCheckSquare, FiClipboard, FiCalendar, FiBarChart2, FiUsers } from 'react-icons/fi';
import type { UserRole } from '../types/dashboard';

export interface DashboardNavItem {
  label: string;
  to: string;
  roles: UserRole[];
  icon: IconType;
}

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { label: 'Mis materias', to: '/dashboard/materias', roles: ['estudiante'], icon: FiBookOpen },
  { label: 'Actividades', to: '/dashboard/actividades', roles: ['profesor'], icon: FiClipboard },
  { label: 'Asistencia', to: '/dashboard/asistencia', roles: ['profesor'], icon: FiCheckSquare },
  { label: 'Horarios', to: '/dashboard/horarios', roles: ['admin'], icon: FiCalendar },
  { label: 'Reportes', to: '/dashboard/reportes', roles: ['admin'], icon: FiBarChart2 },
  { label: 'Asignaciones', to: '/dashboard/asignaciones', roles: ['admin'], icon: FiUsers },
];
