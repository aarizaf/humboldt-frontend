import wall2 from '../../assets/wall2.jpeg';

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
      </div>
    </section>
  );
}

export default HighlightSection;
