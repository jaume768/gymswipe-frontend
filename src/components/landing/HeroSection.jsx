import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HeroSection.css';
import logoIcon from '../../assets/icono.png';
import { scrollToSection } from '../../utils/scrollUtils';
import { enableBodyScroll, disableBodyScroll } from '../../utils/bodyScrollLock';

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };
  
  // Manejar el bloqueo del scroll cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
    
    // Limpiar el efecto al desmontar el componente
    return () => {
      enableBodyScroll();
    };
  }, [menuOpen]);
  return (
    <section className="hero-section">
      <div className="hero-container">
        <nav className="navbar">
          <div className="logo">
            <div className="logo-icon">
              <img src={logoIcon} alt="GymSwipe Logo" className="logo-image" />
            </div>
            <span className="logo-text">GymSwipe</span>
          </div>
          <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              <li className="nav-item">
                <a href="#" className="nav-link active" onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                }}>Inicio</a>
              </li>
              <li className="nav-item">
                <a href="#informacion" className="nav-link" onClick={(e) => {
                  scrollToSection(e, 'informacion');
                  closeMenu();
                }}>Información</a>
              </li>
              <li className="nav-item">
                <a href="#resenas" className="nav-link" onClick={(e) => {
                  scrollToSection(e, 'resenas');
                  closeMenu();
                }}>Reseñas</a>
              </li>
              <li className="nav-item">
                <a href="#descargar" className="nav-link" onClick={(e) => {
                  scrollToSection(e, 'descargar');
                  closeMenu();
                }}>Descargar</a>
              </li>
            </ul>
            <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text-container">
            <h1 className="hero-title">
              No es solo una<br />
              cita. Es tu<br />
              estilo de vida.
            </h1>
            <button className="cta-button">Crear Cuenta</button>
            <button className="login-button-hero" onClick={handleLoginClick}>Iniciar sesión</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
