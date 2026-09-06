import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';
import {
  getActividadesByMateriaForEstudiante,
  getMateriaById,
  submitActividad,
} from '../../../services/schoolService';
import type { ActividadConEntrega, Materia } from '../../../types/dashboard';
import ActividadItem from '../../../components/dashboard/ActividadItem';
import './Estudiante.css';

function MateriaDetalle() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [materia, setMateria] = useState<Materia | undefined>(undefined);
  const [actividades, setActividades] = useState<ActividadConEntrega[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!materiaId || !user) return;
    const [materiaData, actividadesData] = await Promise.all([
      getMateriaById(materiaId),
      getActividadesByMateriaForEstudiante(materiaId, user.id),
    ]);
    setMateria(materiaData);
    setActividades(actividadesData);
    setIsLoading(false);
  }, [materiaId, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEntregar = async (actividadId: string, respuestaTexto: string) => {
    if (!user) return;
    const entrega = await submitActividad(actividadId, user.id, respuestaTexto);
    setActividades((prev) =>
      prev.map((actividad) => (actividad.id === actividadId ? { ...actividad, entrega } : actividad))
    );
  };

  if (isLoading) {
    return <p className="dashboard-loading-text">Cargando actividades...</p>;
  }

  return (
    <div>
      <button type="button" className="materia-detalle-back" onClick={() => navigate('/dashboard/materias')}>
        <FiArrowLeft aria-hidden="true" /> Volver a mis materias
      </button>

      <h1 className="dashboard-page-title">{materia?.nombre ?? 'Materia'}</h1>
      <p className="dashboard-page-subtitle">
        {materia?.cursoNombre} · {materia?.profesorNombre}
      </p>

      {actividades.length === 0 ? (
        <p className="dashboard-empty-text">Aún no hay actividades para esta materia.</p>
      ) : (
        <ul className="actividad-list">
          {actividades.map((actividad) => (
            <ActividadItem key={actividad.id} actividad={actividad} onEntregar={handleEntregar} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MateriaDetalle;
