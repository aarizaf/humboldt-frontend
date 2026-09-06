import { useCallback, useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { getActividadesByMateriaForEstudiante, submitActividad } from '../../../../services/schoolService';
import type { ActividadConEntrega } from '../../../../types/dashboard';
import ActividadItem from '../../../../components/dashboard/ActividadItem';
import ComingSoon from '../../../../components/ComingSoon';
import type { MateriaOutletContext } from '../MateriaLayout';

function ActividadesTab() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const { user } = useAuth();
  const { materia } = useOutletContext<MateriaOutletContext>();
  const [actividades, setActividades] = useState<ActividadConEntrega[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadActividades = useCallback(async () => {
    if (!materiaId || !user) return;
    const data = await getActividadesByMateriaForEstudiante(materiaId, user.id);
    setActividades(data);
    setIsLoading(false);
  }, [materiaId, user]);

  useEffect(() => {
    loadActividades();
  }, [loadActividades]);

  if (!user) return null;

  if (user.role === 'profesor') {
    return (
      <ComingSoon
        titulo={`Gestión de actividades de ${materia.nombre}`}
        descripcion="Aquí podrás asignar y calificar las actividades de este curso. Esta función está en construcción."
      />
    );
  }

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

  if (actividades.length === 0) {
    return <p className="dashboard-empty-text">Aún no hay actividades para esta materia.</p>;
  }

  return (
    <ul className="actividad-list">
      {actividades.map((actividad) => (
        <ActividadItem key={actividad.id} actividad={actividad} onEntregar={handleEntregar} />
      ))}
    </ul>
  );
}

export default ActividadesTab;
