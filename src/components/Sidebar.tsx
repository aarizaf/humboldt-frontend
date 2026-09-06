import { NavLink } from 'react-router-dom';
import { DASHBOARD_NAV_ITEMS } from '../constants/dashboardNav';
import type { UserRole } from '../types/dashboard';
import escudo from '../assets/escudo.jpg';
import './Sidebar.css';

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const items = DASHBOARD_NAV_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <>
      <aside className={`sidebar${isOpen ? ' open' : ''}`} aria-label="Navegación del panel">
        <div className="sidebar-brand">
          <img src={escudo} alt="Logo Colegio Humboldt" className="sidebar-logo" />
          <span className="sidebar-brand-name">Colegio Humboldt</span>
        </div>
        <nav>
          <ul className="sidebar-nav">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                    onClick={onClose}
                  >
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
    </>
  );
}

export default Sidebar;
