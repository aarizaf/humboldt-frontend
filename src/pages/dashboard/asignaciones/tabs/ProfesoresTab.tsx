import { useEffect, useState } from 'react';
import { asignarProfesorAMateria, getMaterias, getProfesores } from '../../../../services/schoolService';
import type { Materia, Profesor } from '../../../../types/dashboard';

function ProfesoresTab() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getMaterias(), getProfesores()]).then(([materiasData, profesoresData]) => {
      setMaterias(materiasData);
      setProfesores(profesoresData);
      setIsLoading(false);
    });
  }, []);

  const handleProfesorChange = async (materiaId: string, profesorId: string) => {
    setSavingId(materiaId);
    try {
      const actualizada = await asignarProfesorAMateria(materiaId, profesorId || null);
      setMaterias((prev) => prev.map((m) => (m.id === materiaId ? actualizada : m)));
    } finally {
      setSavingId(null);
    }
  };

  if (isLoading) {
    return <p className="dashboard-loading-text">Cargando materias...</p>;
  }

  if (materias.length === 0) {
    return <p className="dashboard-empty-text">Todavía no hay materias registradas.</p>;
  }

  return (
    <table className="asignaciones-table">
      <thead>
        <tr>
          <th>Materia</th>
          <th>Curso</th>
          <th>Profesor</th>
        </tr>
      </thead>
      <tbody>
        {materias.map((materia) => (
          <tr key={materia.id}>
            <td>{materia.nombre}</td>
            <td>{materia.cursoNombre}</td>
            <td>
              <select
                className="asignaciones-select"
                value={materia.profesorId ?? ''}
                onChange={(e) => handleProfesorChange(materia.id, e.target.value)}
                disabled={savingId === materia.id}
              >
                <option value="">Sin profesor asignado</option>
                {profesores.map((profesor) => (
                  <option key={profesor.id} value={profesor.id}>
                    {profesor.nombre}
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

export default ProfesoresTab;
