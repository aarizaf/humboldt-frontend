import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import {
  crearMateriaParaCurso,
  eliminarMateria,
  getCursos,
  getMateriasByCurso,
} from '../../../../services/schoolService';
import type { Curso, Materia } from '../../../../types/dashboard';
import Button from '../../../../components/ui/Button';

function MateriasTab() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<string>('');
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [nombreMateria, setNombreMateria] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCursos().then((data) => {
      setCursos(data);
      setCursoSeleccionado((prev) => prev || data[0]?.id || '');
      setIsLoading(false);
    });
  }, []);

  const loadMaterias = useCallback(async (cursoId: string) => {
    if (!cursoId) {
      setMaterias([]);
      return;
    }
    const data = await getMateriasByCurso(cursoId);
    setMaterias(data);
  }, []);

  useEffect(() => {
    loadMaterias(cursoSeleccionado);
  }, [cursoSeleccionado, loadMaterias]);

  const handleAgregarMateria = async (e: FormEvent) => {
    e.preventDefault();
    const nombre = nombreMateria.trim();
    if (!nombre || !cursoSeleccionado) return;

    setIsSubmitting(true);
    try {
      const nueva = await crearMateriaParaCurso(nombre, cursoSeleccionado);
      setMaterias((prev) => [...prev, nueva]);
      setNombreMateria('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEliminarMateria = async (materiaId: string) => {
    await eliminarMateria(materiaId);
    setMaterias((prev) => prev.filter((m) => m.id !== materiaId));
  };

  if (isLoading) {
    return <p className="dashboard-loading-text">Cargando cursos...</p>;
  }

  if (cursos.length === 0) {
    return <p className="dashboard-empty-text">Todavía no hay cursos registrados.</p>;
  }

  return (
    <div>
      <div className="asignaciones-field">
        <label htmlFor="curso-select" className="asignaciones-field-label">
          Curso
        </label>
        <select
          id="curso-select"
          className="asignaciones-select"
          value={cursoSeleccionado}
          onChange={(e) => setCursoSeleccionado(e.target.value)}
        >
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nombre}
            </option>
          ))}
        </select>
      </div>

      <form className="asignaciones-form-inline" onSubmit={handleAgregarMateria}>
        <input
          type="text"
          className="asignaciones-input"
          placeholder="Nombre de la materia (ej. Química)"
          value={nombreMateria}
          onChange={(e) => setNombreMateria(e.target.value)}
          required
        />
        <Button type="submit" isLoading={isSubmitting} loadingText="Agregando...">
          Agregar materia
        </Button>
      </form>

      {materias.length === 0 ? (
        <p className="dashboard-empty-text">Este curso todavía no tiene materias asignadas.</p>
      ) : (
        <table className="asignaciones-table">
          <thead>
            <tr>
              <th>Materia</th>
              <th>Profesor</th>
              <th aria-label="Acciones" />
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.nombre}</td>
                <td>{materia.profesorNombre ?? 'Sin profesor asignado'}</td>
                <td>
                  <button
                    type="button"
                    className="asignaciones-icon-btn"
                    onClick={() => handleEliminarMateria(materia.id)}
                    aria-label={`Eliminar ${materia.nombre}`}
                  >
                    <FiTrash2 aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MateriasTab;
