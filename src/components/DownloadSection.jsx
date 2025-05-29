import React from 'react';
import './DownloadSection.css';
import appStoreButton from '../assets/app_store_button.png';
import googlePlayButton from '../assets/google_play_button.png';
import movilImage from '../assets/movil.png';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const DownloadSection = () => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver({
    threshold: 0.2
  });

  return (
    <section
      id="descargar"
      className="download-section"
      ref={sectionRef}
    >
      <div className={`download-container ${isSectionVisible ? 'animate-zoom visible' : 'animate-zoom'}`}>
        <div className="download-content">
          <h2 className="download-title">Descargar</h2>
          <p className="download-subtitle">
            Consigue la app y lleva GymSwipe contigo.
          </p>

          <div className="download-buttons">
            <a href="https://play.google.com/store/apps/details?id=com.gymswipe.app&hl=en" target="_blank" rel="noopener noreferrer" className="store-button">
              <img
                src={googlePlayButton}
                alt="Disponible en Google Play"
                className="store-image"
              />
            </a>
            <a href="#" className="store-button">
              <img
                src={appStoreButton}
                alt="Descargar en App Store"
                className="store-image"
              />
            </a>
          </div>

          <div className="iphone-instructions">
            <h3 className="instructions-title">¿Usas iPhone?</h3>
            <ol className="instructions-list">
              <li>Abre gymswipe.app desde Safari.</li>
              <li>Pulsa el icono de compartir.</li>
              <li>Selecciona "Añadir a la pantalla de inicio".</li>
            </ol>
            <p className="instructions-note">
              ¡Y listo! Tendrás GymSwipe instalada como una app más en tu iPhone.
            </p>
          </div>
        </div>

        <div className="mobile-preview">
          <img
            src={movilImage}
            alt="Previsualización de GymSwipe en móvil"
            className="mobile-image"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
