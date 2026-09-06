import { FiTool } from 'react-icons/fi';
import './ComingSoon.css';

interface ComingSoonProps {
  titulo: string;
  descripcion: string;
}

function ComingSoon({ titulo, descripcion }: ComingSoonProps) {
  return (
    <div className="coming-soon">
      <div className="coming-soon-icon" aria-hidden="true">
        <FiTool />
      </div>
      <h1 className="coming-soon-title">{titulo}</h1>
      <p className="coming-soon-text">{descripcion}</p>
      <span className="coming-soon-badge">Próximamente</span>
    </div>
  );
}

export default ComingSoon;
