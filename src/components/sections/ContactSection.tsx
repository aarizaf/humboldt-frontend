import { Link } from 'react-router-dom';
import { FiInstagram } from 'react-icons/fi';
import { CONTACT_INFO } from '../../constants';
import escudo from '../../assets/escudo.jpg';

const INSTAGRAM_URL = 'https://www.instagram.com/iedhumboldt/';

function ContactSection() {
  return (
    <footer className="site-footer" id="contacto">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <img src={escudo} alt="Logo Colegio Humboldt" className="footer-brand-logo" />
          <span className="footer-brand-name">Colegio Humboldt</span>
          <p className="footer-brand-tagline">¡De camino a la excelencia!</p>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Contáctanos</h2>
          <ul className="footer-contact-list">
            {CONTACT_INFO.map((item) => (
              <li key={item.id} className="footer-contact-item">
                {item.href ? (
                  <a href={item.href} className="footer-contact-link">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Síguenos</h2>
          <div className="footer-social-icons">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="Instagram del Colegio Humboldt"
            >
              <FiInstagram />
            </a>
          </div>
          <p className="footer-social-text">
            Si eres estudiante, padre de familia, profesor o colaborador, ingresa a la plataforma
            del colegio aquí.
          </p>
          <Link to="/login" className="footer-login-btn">
            LOGIN
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default ContactSection;
