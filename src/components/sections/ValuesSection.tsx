const SHERR_LETTERS = [
  { char: 'N', color: 'sh' },
  { char: 'U', color: 'h' },
  { char: 'E', color: 'e' },
  { char: 'S', color: 'h' },
  { char: 'T', color: 'sh' },
  { char: 'R', color: 'e' },
  { char: 'O', color: 'h' },
  { char: 'S', color: 'e' },
] as const;

function ValuesSection() {
  return (
    <section className="values-section" id="valores">
      <div className="values-block">
        <h3 className="values-title">
          {SHERR_LETTERS.map(({ char, color }) => (
            <span key={char} className={`sherr-color ${color}`}>{char}</span>
          ))}
          <span>  Valores</span>
        </h3>
        <p className="values-desc">
          Convicciones que se evidencian en nuestro comportamiento diario y reflejan
          un estilo de vida basado en la espiritualidad, la honestidad, la excelencia,
          la responsabilidad y el respeto.
        </p>
      </div>
      <div className="values-img">
        <img
          src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
          alt="Valores SHERR"
        />
      </div>
    </section>
  );
}

export default ValuesSection;
