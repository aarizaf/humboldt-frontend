import React from 'react';
import Navbar from '../components/Navbar';
import './LandingPage.css';

const LandingPage: React.FC = () => (
  <div className="landing-page">
    <Navbar />
    <section className="hero-section">
      <div className="hero-overlay">
        <h1 className="hero-title">WE ARE HUMBOLDT</h1>
        <p className="hero-subtitle">Para estudiantes talentosos y sobresalientes</p>
      </div>
    </section>
    <section className="highlight-section">
      <div className="highlight-img">
        <img src={require('../assets/wall2.jpeg')} alt="Colegio Humboldt" />
      </div>
      <div className="highlight-text">
        <span className="highlight-top">SOMOS</span>
        <span className="highlight-main">EL MEJOR</span>
        <span className="highlight-bottom">COLEGIO PÚBLICO<br />DEL PAÍS</span>
      </div>
    </section>
    <section className="values-section">
      <div className="values-block">
        <h3 className="values-title">
          <span className="sherr-color sh">S</span>
          <span className="sherr-color h">H</span>
          <span className="sherr-color e">E</span>
          <span className="sherr-color r1">R</span>
          <span className="sherr-color r2">R</span>
          <span> Values</span>
        </h3>
        <p className="values-desc">
          Convicciones que se evidencian en nuestro comportamiento diario y reflejan un estilo de vida basado en la espiritualidad, la honestidad, la excelencia, la responsabilidad y el respeto.
        </p>
      </div>
      <div className="values-img">
        {/* Imagen de ejemplo, reemplazar por la real */}
        <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80" alt="Valores SHERR" />
      </div>
    </section>

    <section className="instagram-section">
      <h2 className="instagram-title"></h2>
      <div className="instagram-posts">
        {/* Ejemplo de posts embebidos, reemplazar los src por los reales */}
  <iframe src="https://www.instagram.com/p/DH4hG1OOvXs/embed" title="Instagram post 1" className="instagram-embed" allowTransparency frameBorder={0} scrolling="no"></iframe>
  <iframe src="https://www.instagram.com/p/DOn4DSPDjtE/embed" title="Instagram post 2" className="instagram-embed" allowTransparency frameBorder={0} scrolling="no"></iframe>
  <iframe src="https://www.instagram.com/p/DNgMCYQuYgF/embed" title="Instagram post 3" className="instagram-embed" allowTransparency frameBorder={0} scrolling="no"></iframe>
      </div>
    </section>
  </div>
);

export default LandingPage;
