import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { login } from '../services/authService';
import escudo from '../assets/escudo.jpg';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const { values, handleChange, reset } = useForm({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!values.username.trim() || !values.password.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(values);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
        reset();
      }
    } catch {
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-welcome">¡Bienvenido!</h1>
      <p className="login-subtitle">Para estudiantes talentosos y sobresalientes</p>

      <div className="login-card">
        <img src={escudo} alt="Logo Humboldt" className="login-logo" />

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              className="login-input"
              value={values.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password" className="login-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="login-input"
              value={values.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>

      <p className="login-footer-text">¡De camino a la excelencia!</p>
    </div>
  );
}

export default LoginPage;
