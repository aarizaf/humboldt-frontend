import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';
import { getMateriaById } from '../../../services/schoolService';
import type { Materia } from '../../../types/dashboard';
import CourseNav from '../../../components/dashboard/CourseNav';
import './Materias.css';

export interface MateriaOutletContext {
  materia: Materia;
}

function MateriaLayout() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [materia, setMateria] = useState<Materia | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!materiaId) return;
    getMateriaById(materiaId).then((data) => {
      setMateria(data);
      setIsLoading(false);
    });
  }, [materiaId]);

  if (isLoading || !user) {
    return <p className="dashboard-loading-text">Cargando curso...</p>;
  }

  if (!materia || !materiaId) {
    return <p className="dashboard-empty-text">No se encontró el curso solicitado.</p>;
  }

  return (
    <div className="materia-layout">
      <button type="button" className="materia-detalle-back" onClick={() => navigate('/dashboard/materias')}>
        <FiArrowLeft aria-hidden="true" /> Volver a mis cursos
      </button>

      <div className="materia-banner" style={{ backgroundImage: `url(${materia.imagenUrl})` }}>
        <div className="materia-banner-overlay">
          <h1 className="materia-banner-title">{materia.nombre}</h1>
          <p className="materia-banner-meta">
            {materia.cursoNombre} · {materia.profesorNombre}
          </p>
        </div>
      </div>

      <CourseNav basePath={`/dashboard/materias/${materiaId}`} />

      <div className="materia-tab-content">
        <Outlet context={{ materia } satisfies MateriaOutletContext} />
      </div>
    </div>
  );
}

export default MateriaLayout;
