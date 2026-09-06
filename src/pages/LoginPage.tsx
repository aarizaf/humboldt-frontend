import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../contexts/AuthContext';
import TextField from '../components/ui/TextField';
import Button from '../components/ui/Button';
import escudo from '../assets/escudo.jpg';
import './LoginPage.css';
import './RegisterPage.css';

const SCHOOL_NAME = 'Colegio Humboldt';
const ERROR_ID = 'login-error';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { values, handleChange, reset } = useForm({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        navigate('/dashboard');
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
    <div className="login-page">
      <div className="login-panels">
        <section className="login-panel login-panel-brand" aria-label="Institución">
          <img src={escudo} alt="" className="login-brand-logo" />
          <h1 className="login-brand-title">{SCHOOL_NAME}</h1>
          <button
            type="button"
            className="login-change-school"
            title="Función no disponible aún"
          >
            Cambiar colegio
          </button>
        </section>

        <section className="login-panel login-panel-form" aria-labelledby="login-heading">
          <img src={escudo} alt="Logo Humboldt" className="login-logo login-logo--mobile" />
          <h2 id="login-heading" className="login-form-title">
            Iniciar sesión
          </h2>
          <p className="login-subtitle">Para estudiantes talentosos y sobresalientes</p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <TextField
              id="username"
              label="Usuario"
              type="text"
              icon={<FiUser />}
              value={values.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              autoComplete="username"
              errorId={error ? ERROR_ID : undefined}
              required
            />

            <TextField
              id="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              icon={<FiLock />}
              value={values.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              errorId={error ? ERROR_ID : undefined}
              required
              endAction={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />

            {error && (
              <p id={ERROR_ID} className="login-error" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="login-submit-btn"
              isLoading={isSubmitting}
              loadingText="Entrando..."
            >
              Iniciar sesión <FiArrowRight aria-hidden="true" />
            </Button>
          </form>

          <button type="button" className="login-forgot-link" title="Función no disponible aún">
            ¿Olvidaste tu contraseña?
          </button>

          <p className="register-login-link">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="register-link">
              Regístrate
            </Link>
          </p>
        </section>
      </div>

      <p className="login-footer-text">
        <FiMapPin aria-hidden="true" /> ¡De camino a la excelencia!
      </p>
    </div>
  );
}

export default LoginPage;
