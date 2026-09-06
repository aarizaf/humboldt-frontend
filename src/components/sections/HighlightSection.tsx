import { FiAward, FiUsers, FiCompass } from 'react-icons/fi';
import wall2 from '../../assets/wall2.jpeg';

const HIGHLIGHTS = [
  {
    id: 'academico',
    icon: FiAward,
    title: 'Excelencia académica',
    text: 'Altos estándares académicos y un compromiso constante con el aprendizaje.',
  },
  {
    id: 'comunidad',
    icon: FiUsers,
    title: 'Comunidad comprometida',
    text: 'Una comunidad unida por el respeto, la colaboración y el sentido de pertenencia.',
  },
  {
    id: 'integral',
    icon: FiCompass,
    title: 'Formación integral',
    text: 'Acompañamos el desarrollo académico, personal y social de cada estudiante.',
  },
] as const;

function HighlightSection() {
  return (
    <section className="highlight-section">
      <div className="highlight-img">
        <img src={wall2} alt="Colegio Humboldt" />
      </div>
      <div className="highlight-text">
        <span className="highlight-top">SOMOS</span>
        <span className="highlight-main">EL MEJOR</span>
        <span className="highlight-bottom">COLEGIO PÚBLICO<br />DEL PAÍS</span>

        <p className="highlight-desc">
          Un colegio público que forma estudiantes talentosos y sobresalientes, con una propuesta
          educativa que combina exigencia académica, valores y sentido de comunidad.
        </p>

        <div className="highlight-mini-grid">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div className="highlight-mini-card" key={item.id}>
                <Icon className="highlight-mini-icon" aria-hidden="true" />
                <h3 className="highlight-mini-title">{item.title}</h3>
                <p className="highlight-mini-text">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HighlightSection;
