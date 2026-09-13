import { NavLink } from 'react-router-dom';

interface AsignacionesNavProps {
  basePath: string;
}

const ASIGNACIONES_ITEMS = [
  { label: 'Estudiantes y cursos', to: 'estudiantes' },
  { label: 'Materias por curso', to: 'materias' },
  { label: 'Profesores por materia', to: 'profesores' },
];

function AsignacionesNav({ basePath }: AsignacionesNavProps) {
  return (
    <nav className="asignaciones-nav">
      {ASIGNACIONES_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={`${basePath}/${item.to}`}
          className={({ isActive }) => `asignaciones-nav-link${isActive ? ' active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default AsignacionesNav;
