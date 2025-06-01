import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import './SingleUserView.css';

const SingleUserView = forwardRef(({ user, onDoubleTapLike }, ref) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [touchCount, setTouchCount] = useState(0);
  
  // Precarga de imágenes
  useEffect(() => {
    if (user?.photos && user.photos.length > 0) {
      user.photos.forEach(photo => {
        const img = new Image();
        img.src = photo.url;
      });
    }
  }, [user]);

  // Navegar por las fotos horizontalmente
  const handlePhotoNavigation = (direction) => {
    if (!user.photos || user.photos.length <= 1) return;
    
    if (direction === 'next') {
      setCurrentPhotoIndex((prev) => 
        prev === user.photos.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? user.photos.length - 1 : prev - 1
      );
    }
  };

  // Mostrar animación de corazón
  const showLikeAnimation = () => {
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 1000);
  };

  // Método público para mostrar animación de corazón desde el componente padre
  const showLikeAnimationInCenter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setHeartPosition({
        x: rect.width / 2,
        y: rect.height / 2
      });
      showLikeAnimation();
    }
  };

  // Exponer método al componente padre
  useImperativeHandle(ref, () => ({
    showLikeAnimationInCenter
  }));

  if (!user) return <div className="single-user-loading">Cargando perfil...</div>;

  return (
    <div 
      ref={containerRef}
      className="single-user-container"
      onTouchStart={() => {
        const now = Date.now();
        if (now - lastTapTime < 300) {
          // Doble tap detectado
          setTouchCount(prev => prev + 1);
          if (touchCount >= 1) {
            onDoubleTapLike();
            showLikeAnimation();
            setTouchCount(0);
          }
        } else {
          setTouchCount(1);
        }
        setLastTapTime(now);
      }}
    >
      {/* Foto de perfil con navegación */}
      <div className="photo-container">
        <img 
          src={user.photos && user.photos.length > 0 
            ? user.photos[currentPhotoIndex].url
            : 'https://via.placeholder.com/400x600?text=No+Photo'} 
          alt={`${user.username} photo ${currentPhotoIndex + 1}`}
          className="profile-photo"
        />
        
        {/* Nombre del usuario en la parte superior */}
        <div className="user-header">
          <h2 className="username">{user.username}</h2>
        </div>
        
        {/* Etiqueta de volumen en la parte inferior izquierda */}
        <div className="user-goal">
          <span className="goal-badge">
            <span className="goal-icon">🏋️</span>
            {user.goal || 'Volumen'}
          </span>
        </div>
        
        {/* Ubicación y biografía en la parte inferior */}
        <div className="user-info">
          {user.biography && <p className="biography">{user.biography}</p>}
          {user.city && (
            <p className="location">
              <span className="location-icon">📍</span> {user.city}
            </p>
          )}
        </div>
        
        {/* Navegación de fotos (indicadores) */}
        {user.photos && user.photos.length > 1 && (
          <div className="photo-indicators">
            {user.photos.map((_, index) => (
              <div 
                key={index}
                className={`photo-indicator ${index === currentPhotoIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
        
        {/* Animación de corazón */}
        {showHeartAnimation && (
          <div 
            className="heart-animation"
            style={{ 
              left: `${heartPosition.x}px`, 
              top: `${heartPosition.y}px` 
            }}
          >
            ❤️
          </div>
        )}
      </div>
    </div>
  );
});

export default SingleUserView;
