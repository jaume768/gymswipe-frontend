import React from 'react';
import './styles/Footer.css';
import logoIcon from '../../assets/icono.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logoIcon} alt="GymSwipe Logo" className="footer-logo-image" />
            <span className="footer-logo-text">GymSwipe</span>
          </div>
          
          <div className="footer-nav">
            <div className="footer-nav-column">
              <h4 className="footer-heading">La App</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Sobre nosotros</a></li>
                <li><a href="#" className="footer-link">Cómo funciona</a></li>
                <li><a href="#" className="footer-link">Testimonios</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Términos de uso</a></li>
                <li><a href="#" className="footer-link">Privacidad</a></li>
                <li><a href="#" className="footer-link">Cookies</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4 className="footer-heading">Contacto</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Ayuda</a></li>
                <li><a href="#" className="footer-link">Soporte</a></li>
                <li><a href="#" className="footer-link">Contacto</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4 className="footer-heading">Síguenos</h4>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                    </svg>
                  </i>
                </a>
                <a href="#" className="social-link">
                  <i className="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2C5.61 4 4 5.61 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8c1.99 0 3.6-1.61 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </i>
                </a>
                <a href="#" className="social-link">
                  <i className="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} GymSwipe. Todos los derechos reservados.
          </p>
          <p className="designer">
            Diseñado con ❤️ para entrenadores apasionados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
