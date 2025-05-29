import React from 'react';
import './styles/ReviewsSection.css';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const ReviewsSection = () => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver({
    threshold: 0.2
  });
  
  return (
    <section 
      id="resenas" 
      className="reviews-section" 
      ref={sectionRef}
    >
      <div className={`reviews-container ${isSectionVisible ? 'animate-slide-up visible' : 'animate-slide-up'}`}>
        <h2 className="reviews-title">Lo que dicen nuestros usuarios</h2>
        
        <div className="reviews-grid">
          {/* Review 1 */}
          <div className="review-card">
            <div className="review-header">
              <div className="avatar-container">
                <div className="avatar-placeholder">ML</div>
              </div>
              <div className="reviewer-info">
                <h3 className="reviewer-name">María López</h3>
                <div className="reviewer-rating">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
              </div>
            </div>
            <p className="review-text">
              "Gracias a GymSwipe encontré a mi compañero ideal de entrenamiento. 
              Lo mejor es que conectamos por nuestros objetivos fitness, no solo por 
              la apariencia. Ahora hacemos crossfit juntos tres veces por semana y nos 
              motivamos mutuamente. ¡No puedo imaginar mis rutinas sin él!"
            </p>
            <div className="review-date">Mayo 2025</div>
          </div>
          
          {/* Review 2 */}
          <div className="review-card">
            <div className="review-header">
              <div className="avatar-container">
                <div className="avatar-placeholder">AT</div>
              </div>
              <div className="reviewer-info">
                <h3 className="reviewer-name">Alejandro Torres</h3>
                <div className="reviewer-rating">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
              </div>
            </div>
            <p className="review-text">
              "Llevo años entrenando pero me costaba mantener la constancia. 
              Desde que uso GymSwipe he conocido a varios compañeros con los que 
              comparto la misma pasión por el culturismo. La app realmente entiende 
              lo que buscamos los que vivimos el fitness como un estilo de vida."
            </p>
            <div className="review-date">Abril 2025</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
