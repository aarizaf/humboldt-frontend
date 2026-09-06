import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { getMateriasConPendientesByEstudiante } from '../../../services/schoolService';
import type { MateriaConPendientes } from '../../../types/dashboard';
import MateriaCard from '../../../components/dashboard/MateriaCard';
import './Estudiante.css';

function MisMaterias() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [materias, setMaterias] = useState<MateriaConPendientes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getMateriasConPendientesByEstudiante(user.id).then((data) => {
      setMaterias(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) {
    return <p className="dashboard-loading-text">Cargando materias...</p>;
  }

  return (
    <div>
      <h1 className="dashboard-page-title">Mis materias</h1>
      <p className="dashboard-page-subtitle">Selecciona una materia para ver tus actividades.</p>

      {materias.length === 0 ? (
        <p className="dashboard-empty-text">Todavía no tienes materias asignadas.</p>
      ) : (
        <div className="materia-grid">
          {materias.map((materia) => (
            <MateriaCard
              key={materia.id}
              materia={materia}
              onClick={() => navigate(`/dashboard/materias/${materia.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MisMaterias;
