import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { getMateriasByProfesor, getMateriasConPendientesByEstudiante } from '../../../services/schoolService';
import type { MateriaConPendientes } from '../../../types/dashboard';
import MateriaCard from '../../../components/dashboard/MateriaCard';
import './Materias.css';

function MisMaterias() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [materias, setMaterias] = useState<MateriaConPendientes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadMaterias =
      user.role === 'profesor'
        ? getMateriasByProfesor(user.id).then((data) =>
            data.map((materia) => ({ ...materia, pendientes: 0 }))
          )
        : getMateriasConPendientesByEstudiante(user.id);

    loadMaterias.then((data) => {
      setMaterias(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) {
    return <p className="dashboard-loading-text">Cargando cursos...</p>;
  }

  return (
    <div>
      <h1 className="dashboard-page-title">Mis cursos</h1>
      <p className="dashboard-page-subtitle">
        {user?.role === 'profesor'
          ? 'Selecciona un curso para gestionar sus actividades.'
          : 'Selecciona un curso para ver tus actividades.'}
      </p>

      {materias.length === 0 ? (
        <p className="dashboard-empty-text">Todavía no tienes cursos asignados.</p>
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
