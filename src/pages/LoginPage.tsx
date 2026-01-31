import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de autenticación
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className="login-container">
      <h1 className="login-welcome">¡Bienvenido!</h1>
      <p className="login-subtitle">Para estudiantes talentosos y sobresalientes</p>
      
      <div className="login-card">
        <img 
          src={require('../assets/escudo.jpg')} 
          alt="Logo Humboldt" 
          className="login-logo"
        />
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Entrar
          </button>
        </form>
      </div>

      <p className="login-footer-text">¡De camino a la excelencia!</p>
    </div>
  );
};

export default LoginPage;