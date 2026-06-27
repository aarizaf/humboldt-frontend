import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { CONTACT_INFO } from '../../constants';

function ContactSection() {
  return (
    <section className="contact-section" id="contacto">
      <h2 className="contact-title">Contacto</h2>
      <div className="contact-info">
        {CONTACT_INFO.map((item) => (
          <div key={item.id} className="contact-item">
            <div className="contact-icon">
              {item.id === 'phone' && <FiPhone size={28} />}
              {item.id === 'email' && <FiMail size={28} />}
              {item.id === 'location' && <FiMapPin size={28} />}
              {item.id === 'hours' && <FiClock size={28} />}
            </div>
            <h3 className="contact-item-title">{item.label}</h3>
            {item.href ? (
              <a href={item.href} className="contact-item-text contact-link">
                {item.value}
              </a>
            ) : (
              <p className="contact-item-text">{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContactSection;
