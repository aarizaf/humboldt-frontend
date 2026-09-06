import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

interface CourseNavProps {
  basePath: string;
}

const EVALUACIONES_ITEMS = [
  { label: 'Cuestionarios', to: 'evaluaciones/cuestionarios' },
  { label: 'Actividades', to: 'evaluaciones/actividades' },
  { label: 'Encuestas', to: 'evaluaciones/encuestas' },
];

function CourseNav({ basePath }: CourseNavProps) {
  const location = useLocation();
  const isEvaluacionesActive = location.pathname.includes(`${basePath}/evaluaciones`);
  const [isEvaluacionesOpen, setIsEvaluacionesOpen] = useState(false);

  return (
    <nav className="course-nav">
      <div className="course-nav-item course-nav-dropdown">
        <button
          type="button"
          className={`course-nav-link${isEvaluacionesActive ? ' active' : ''}`}
          onClick={() => setIsEvaluacionesOpen((prev) => !prev)}
          aria-expanded={isEvaluacionesOpen}
        >
          Evaluaciones <FiChevronDown aria-hidden="true" />
        </button>
        {isEvaluacionesOpen && (
          <ul className="course-nav-submenu">
            {EVALUACIONES_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={`${basePath}/${item.to}`}
                  className={({ isActive }) => `course-nav-submenu-link${isActive ? ' active' : ''}`}
                  onClick={() => setIsEvaluacionesOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>

      <NavLink to={`${basePath}/calificaciones`} className={({ isActive }) => `course-nav-link${isActive ? ' active' : ''}`}>
        Calificaciones
      </NavLink>

      <NavLink to={`${basePath}/asistencia`} className={({ isActive }) => `course-nav-link${isActive ? ' active' : ''}`}>
        Asistencia
      </NavLink>

      <NavLink to={`${basePath}/alumnos`} className={({ isActive }) => `course-nav-link${isActive ? ' active' : ''}`}>
        Lista de alumnos
      </NavLink>
    </nav>
  );
}

export default CourseNav;
