
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import escudo from '../assets/escudo.jpg';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setOpen((prev) => !prev);

  const handleLoginClick = () => {
    setOpen(false);
    window.open('/login', '_blank');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={escudo} alt="Logo Colegio Humboldt" style={{ height: '38px', width: 'auto', display: 'block' }} />
      </div>
      <button className="navbar-toggle" onClick={handleToggle} aria-label="Abrir menú">
        &#9776;
      </button>
      <ul className={`navbar-links${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        <li>Nosotros</li>
        <li>Valores</li>
        <li>Admisiones</li>
        <li>Academia</li>
        <li>Experiencia</li>
        <li>Contacto</li>
        <li className="navbar-login" onClick={handleLoginClick}>LOGIN</li>
      </ul>
      {open && <div className="navbar-overlay" onClick={() => setOpen(false)} />}
    </nav>
  );
};

export default Navbar;
