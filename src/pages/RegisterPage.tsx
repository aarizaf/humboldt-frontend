import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { register } from '../services/authService';
import escudo from '../assets/escudo.jpg';
import './LoginPage.css';
import './RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const { values, handleChange, reset } = useForm({
    nombre: '',
    apellido: '',
    identificacion: '',
    correo: '',
    password: '',
    confirmPassword: '',
  });
  const [usuario, setUsuario] = useState<'profesor' | 'estudiante'>('estudiante');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (
      !values.nombre.trim() ||
      !values.apellido.trim() ||
      !values.identificacion.trim() ||
      !values.correo.trim() ||
      !values.password.trim() ||
      !values.confirmPassword.trim()
    ) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (values.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await register({
        nombre: `${values.nombre.trim().toUpperCase()} ${values.apellido.trim().toUpperCase()}`,
        identificacion: values.identificacion.trim(),
        password: values.password,
        correo: values.correo.trim(),
        usuario,
      });
      if (result.success) {
        navigate('/login');
      } else {
        setError(result.message);
        reset();
      }
    } catch {
      setError('Error al registrarse. Verifica tu conexión e intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-welcome">¡Regístrate!</h1>
      <p className="login-subtitle">Únete a nuestra comunidad de excelencia</p>

      <div className="login-card register-card">
        <img src={escudo} alt="Logo Humboldt" className="login-logo" />

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Nombre y Apellido */}
          <div className="register-row">
            <div className="login-input-group">
              <label htmlFor="nombre" className="login-label">Nombre</label>
              <input
                id="nombre"
                type="text"
                className="login-input"
                value={values.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="login-input-group">
              <label htmlFor="apellido" className="login-label">Apellido</label>
              <input
                id="apellido"
                type="text"
                className="login-input"
                value={values.apellido}
                onChange={handleChange}
                placeholder="Tu apellido"
                required
              />
            </div>
          </div>

          {/* Identificación */}
          <div className="login-input-group">
            <label htmlFor="identificacion" className="login-label">Identificación</label>
            <input
              id="identificacion"
              type="text"
              inputMode="numeric"
              className="login-input"
              value={values.identificacion}
              onChange={handleChange}
              placeholder="Número de identificación"
              required
            />
          </div>

          {/* Correo */}
          <div className="login-input-group">
            <label htmlFor="correo" className="login-label">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              className="login-input"
              value={values.correo}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          {/* Tipo de usuario */}
          <div className="login-input-group">
            <label htmlFor="usuario" className="login-label">Tipo de usuario</label>
            <select
              id="usuario"
              className="login-input register-select"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value as 'profesor' | 'estudiante')}
            >
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>

          {/* Contraseñas */}
          <div className="login-input-group">
            <label htmlFor="password" className="login-label">Contraseña</label>
            <input
              id="password"
              type="password"
              className="login-input"
              value={values.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="confirmPassword" className="login-label">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              className="login-input"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="register-login-link">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="register-link">Inicia sesión</Link>
        </p>
      </div>

      <p className="login-footer-text">¡De camino a la excelencia!</p>
    </div>
  );
}

export default RegisterPage;
