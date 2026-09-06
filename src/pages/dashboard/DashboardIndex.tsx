import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { homeForRole } from '../../routes/dashboardHome';

function DashboardIndex() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return <Navigate to={homeForRole(user.role)} replace />;
}

export default DashboardIndex;
