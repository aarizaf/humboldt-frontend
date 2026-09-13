import { useEffect, useState } from 'react';
import { assignEstudianteACurso, getCursos, getEstudiantes } from '../../../../services/schoolService';
import type { Curso, Estudiante } from '../../../../types/dashboard';

function EstudiantesTab() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getEstudiantes(), getCursos()]).then(([estudiantesData, cursosData]) => {
      setEstudiantes(estudiantesData);
      setCursos(cursosData);
      setIsLoading(false);
    });
  }, []);

  const handleCursoChange = async (estudianteId: string, cursoId: string) => {
    setSavingId(estudianteId);
    try {
      const actualizado = await assignEstudianteACurso(estudianteId, cursoId || null);
      setEstudiantes((prev) => prev.map((e) => (e.id === estudianteId ? actualizado : e)));
    } finally {
      setSavingId(null);
    }
  };

  if (isLoading) {
    return <p className="dashboard-loading-text">Cargando estudiantes...</p>;
  }

  if (estudiantes.length === 0) {
    return <p className="dashboard-empty-text">Todavía no hay estudiantes registrados.</p>;
  }

  return (
    <table className="asignaciones-table">
      <thead>
        <tr>
          <th>Estudiante</th>
          <th>Curso asignado</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((estudiante) => (
          <tr key={estudiante.id}>
            <td>{estudiante.nombre}</td>
            <td>
              <select
                className="asignaciones-select"
                value={estudiante.cursoId ?? ''}
                onChange={(e) => handleCursoChange(estudiante.id, e.target.value)}
                disabled={savingId === estudiante.id}
              >
                <option value="">Sin curso asignado</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nombre}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EstudiantesTab;
