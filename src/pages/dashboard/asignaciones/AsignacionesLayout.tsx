import { Outlet } from 'react-router-dom';
import AsignacionesNav from '../../../components/dashboard/AsignacionesNav';
import './Asignaciones.css';

function AsignacionesLayout() {
  return (
    <div className="asignaciones-layout">
      <h1 className="dashboard-page-title">Asignaciones</h1>
      <p className="dashboard-page-subtitle">
        Administra los estudiantes, materias y profesores de cada curso.
      </p>

      <AsignacionesNav basePath="/dashboard/asignaciones" />

      <div className="asignaciones-tab-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AsignacionesLayout;
