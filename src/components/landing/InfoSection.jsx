import React from 'react';
import './styles/InfoSection.css';
import welcomeImage from '../../assets/welcome_bg.webp';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const InfoSection = () => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver({
    threshold: 0.2
  });
  
  return (
    <section 
      id="informacion" 
      className="info-section" 
      ref={sectionRef}
    >
      <div className={`info-container ${isSectionVisible ? 'animate-fade-in visible' : 'animate-fade-in'}`}>

        {/* Tarjeta de “Qué es GymSwipe?” */}
        <div className="info-text">
          <h2 className="info-title">Qué es GymSwipe?</h2>
          <p className="info-description">
            GymSwipe es la app de citas pensada para quienes entrenan, cuidan su cuerpo
            y viven el fitness como un estilo de vida. A diferencia de otras plataformas,
            aquí no solo haces match por una foto, sino por tus objetivos, rutinas y tu
            forma de vivir.
          </p>
        </div>

        {/* Imagen */}
        <div className="info-image-container">
          <img
            src={welcomeImage}
            alt="Pareja entrenando juntos"
            className="info-image"
          />
        </div>

        {/* Tarjeta de “Filtra por objetivos físicos” */}
        <div className="feature-card">
          <h3 className="feature-title">Filtra por objetivos físicos</h3>
          <p className="feature-description">
            Define si estás en fase de volumen, definición o mantenimiento y encuentra
            a gente que siguen tu mismo ritmo.
          </p>
        </div>

      </div>
    </section>
  );
};

export default InfoSection;
