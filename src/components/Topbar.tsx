import { useNavigate } from 'react-router-dom';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import './Topbar.css';

const ROLE_LABELS: Record<string, string> = {
  estudiante: 'Estudiante',
  profesor: 'Profesor',
  admin: 'Administrador',
};

interface TopbarProps {
  onToggleSidebar: () => void;
}

function Topbar({ onToggleSidebar }: TopbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar-menu-btn"
        onClick={onToggleSidebar}
        aria-label="Abrir navegación"
      >
        <FiMenu />
      </button>

      <div className="topbar-user">
        <div className="topbar-user-info">
          <span className="topbar-user-name">{user?.nombre}</span>
          <span className="topbar-user-role">{user ? ROLE_LABELS[user.role] : ''}</span>
        </div>
        <button type="button" className="topbar-logout-btn" onClick={handleLogout}>
          <FiLogOut aria-hidden="true" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;
