import type { IconType } from 'react-icons';
import { FiBookOpen, FiAward, FiUser, FiUsers } from 'react-icons/fi';
import { ABOUT_STATS } from '../../constants';
import foto from '../../assets/foto.jpeg';

const STAT_ICONS: Record<string, IconType> = {
  estudiantes: FiBookOpen,
  graduados: FiAward,
  docentes: FiUser,
  familias: FiUsers,
};

function AboutSection() {
  return (
    <section className="about-section" id="nosotros">
      <div className="about-text">
        <h2 className="about-title">Sobre nosotros</h2>
        <p className="about-desc">
          Somos una institución educativa pública comprometida con la formación de estudiantes
          talentosos y sobresalientes. A través de una educación de excelencia, acompañamos a
          nuestra comunidad en la construcción de un proyecto de vida basado en el conocimiento,
          la disciplina y el compromiso con el país.
        </p>
        <div className="about-stats">
          {ABOUT_STATS.map((stat) => {
            const Icon = STAT_ICONS[stat.id];
            return (
              <div className="about-stat" key={stat.id}>
                <Icon className="about-stat-icon" aria-hidden="true" />
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="about-image">
        <img src={foto} alt="Estudiantes del Colegio Humboldt" />
      </div>
    </section>
  );
}

export default AboutSection;
