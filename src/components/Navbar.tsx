import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import escudo from '../assets/escudo.jpg';
import { NAV_ITEMS } from '../constants';

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  const handleLoginClick = () => {
    closeMenu();
    navigate('/login');
  };

  const handleNavClick = (href: string) => {
    closeMenu();
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Menú principal">
      <div className="navbar-logo">
        <img src={escudo} alt="Logo Colegio Humboldt" height={44} width={120} />
      </div>
      <button
        className="navbar-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
      >
        &#9776;
      </button>
      <ul className={`navbar-links${open ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <button
              className="navbar-link-btn"
              onClick={() => handleNavClick(item.href)}
            >
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <button className="navbar-login-btn" onClick={handleLoginClick}>
            LOGIN
          </button>
        </li>
      </ul>
      {open && (
        <div
          className="navbar-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}

export default Navbar;
