import { SCHOOL_PILLARS } from '../../constants';

function DistinctivesSection() {
  return (
    <section className="distinctives-section">
      <div className="distinctives-inner">
        <h2 className="distinctives-title">Lo que nos hace únicos e incomparables</h2>
        <p className="distinctives-quote">“¡De camino a la excelencia!”</p>
        <p className="distinctives-desc">
          Representado en los pilares que el colegio busca desarrollar en sus estudiantes:
        </p>
        <p className="distinctives-pillars">
          {SCHOOL_PILLARS.map((pillar, index) => (
            <span key={pillar.id}>
              {pillar.label}
              {index < SCHOOL_PILLARS.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export default DistinctivesSection;
