import type { MateriaConPendientes } from '../../types/dashboard';

interface MateriaCardProps {
  materia: MateriaConPendientes;
  onClick: () => void;
}

function MateriaCard({ materia, onClick }: MateriaCardProps) {
  return (
    <button type="button" className="materia-card" onClick={onClick}>
      <div className="materia-card-cover">
        <img src={materia.imagenUrl} alt="" />
        {materia.pendientes > 0 && (
          <span className="materia-card-badge">
            {materia.pendientes} pendiente{materia.pendientes > 1 ? 's' : ''}
          </span>
        )}
      </div>
      <div className="materia-card-body">
        <h3 className="materia-card-title">{materia.nombre}</h3>
        <p className="materia-card-meta">
          {materia.cursoNombre} · {materia.profesorNombre}
        </p>
      </div>
    </button>
  );
}

export default MateriaCard;
