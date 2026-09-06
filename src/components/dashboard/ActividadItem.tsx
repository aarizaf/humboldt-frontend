import { useState } from 'react';
import type { ActividadConEntrega } from '../../types/dashboard';
import EntregaForm from './EntregaForm';

const ESTADO_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  entregada: 'Entregada',
  calificada: 'Calificada',
};

interface ActividadItemProps {
  actividad: ActividadConEntrega;
  onEntregar: (actividadId: string, respuestaTexto: string) => Promise<void>;
}

function ActividadItem({ actividad, onEntregar }: ActividadItemProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const estado = actividad.entrega?.estado ?? 'pendiente';

  const handleSubmit = async (respuestaTexto: string) => {
    setIsSubmitting(true);
    try {
      await onEntregar(actividad.id, respuestaTexto);
      setIsFormOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <li className="actividad-item">
      <div className="actividad-item-header">
        <div>
          <h3 className="actividad-item-title">{actividad.titulo}</h3>
          <p className="actividad-item-fecha">Fecha límite: {actividad.fechaLimite}</p>
        </div>
        <span className={`actividad-item-badge actividad-item-badge--${estado}`}>
          {ESTADO_LABELS[estado]}
          {actividad.entrega?.calificacion !== undefined && ` · ${actividad.entrega.calificacion}/5`}
        </span>
      </div>

      <p className="actividad-item-desc">{actividad.descripcion}</p>

      {estado === 'pendiente' && !isFormOpen && (
        <button type="button" className="actividad-item-entregar-btn" onClick={() => setIsFormOpen(true)}>
          Entregar actividad
        </button>
      )}

      {isFormOpen && (
        <EntregaForm
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </li>
  );
}

export default ActividadItem;
