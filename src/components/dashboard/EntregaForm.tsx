import { useState, type FormEvent } from 'react';
import Button from '../ui/Button';

interface EntregaFormProps {
  onSubmit: (respuestaTexto: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

function EntregaForm({ onSubmit, onCancel, isSubmitting }: EntregaFormProps) {
  const [respuesta, setRespuesta] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!respuesta.trim()) return;
    onSubmit(respuesta.trim());
  };

  return (
    <form className="entrega-form" onSubmit={handleSubmit}>
      <label htmlFor="respuesta-texto" className="entrega-form-label">
        Tu respuesta
      </label>
      <textarea
        id="respuesta-texto"
        className="entrega-form-textarea"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder="Escribe aquí tu respuesta o pega el enlace de tu trabajo..."
        rows={4}
        required
      />
      <div className="entrega-form-actions">
        <button type="button" className="entrega-form-cancel" onClick={onCancel}>
          Cancelar
        </button>
        <Button type="submit" className="entrega-form-submit" isLoading={isSubmitting} loadingText="Enviando...">
          Enviar actividad
        </Button>
      </div>
    </form>
  );
}

export default EntregaForm;
