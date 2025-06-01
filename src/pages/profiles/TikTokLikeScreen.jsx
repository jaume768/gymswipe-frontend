import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SingleUserView from '../../components/profiles/SingleUserView';
import { getSuggestedProfiles, getLikedUsers, likeUser, superLikeUser, updateSeenProfiles, reportUser } from '../../services/profileService';
import './TikTokLikeScreen.css';

const TikTokLikeScreen = () => {
  // Estado para los perfiles
  const [randomUsers, setRandomUsers] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [showRandom, setShowRandom] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScrollLimitReached, setIsScrollLimitReached] = useState(false);
  const [isLikeLimitReached, setIsLikeLimitReached] = useState(false);
  const [limitResetTime, setLimitResetTime] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [userToReport, setUserToReport] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');

  // Set para almacenar IDs de perfiles cargados y vistos
  const [loadedProfileIds, setLoadedProfileIds] = useState(new Set());
  const [seenProfileIds, setSeenProfileIds] = useState(new Set());
  
  // Referencias
  const singleUserViewRef = useRef(null);
  const touchStartYRef = useRef(0); // Referencia para la posición Y inicial del touch

  // Filtros (se podrían expandir con un modal de filtros)
  const [activeFilters, setActiveFilters] = useState({});

  // Obtener contexto de autenticación y navegación
  const { user } = useAuth();
  const navigate = useNavigate();

  // Cargar datos iniciales
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    Promise.all([loadInitialProfiles(), fetchLikedUsers()])
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Error cargando datos iniciales:', error);
        setIsLoading(false);
      });
  }, [user, navigate]);

  // Cargar batch inicial de perfiles
  const loadInitialProfiles = async () => {
    try {
      const data = await getSuggestedProfiles(activeFilters, 20, 0);
      if (data.success) {
        const profiles = data.matches || [];
        setRandomUsers(profiles);
        setLoadedProfileIds(new Set(profiles.map(profile => profile._id)));
      }
    } catch (error) {
      console.error('Error cargando perfiles iniciales:', error);
    }
  };

  // Obtener usuarios que han dado like
  const fetchLikedUsers = async () => {
    try {
      const data = await getLikedUsers();
      if (data.success) {
        setLikedUsers(data.usersWhoLiked || []);
      }
    } catch (error) {
      console.error('Error obteniendo usuarios que han dado like:', error);
    }
  };

  // Cargar más perfiles (paginación)
  const fetchMoreProfiles = async () => {
    if (isFetchingMore || isScrollLimitReached) return;
    
    setIsFetchingMore(true);
    try {
      const data = await getSuggestedProfiles(
        activeFilters, 
        20, 
        randomUsers.length
      );
      
      if (data.success) {
        const newProfiles = data.matches || [];
        
        // Filtrar perfiles duplicados
        const uniqueNewProfiles = newProfiles.filter(
          profile => !loadedProfileIds.has(profile._id)
        );
        
        if (uniqueNewProfiles.length > 0) {
          setRandomUsers(prev => [...prev, ...uniqueNewProfiles]);
          setLoadedProfileIds(prev => {
            const updated = new Set(prev);
            uniqueNewProfiles.forEach(profile => updated.add(profile._id));
            return updated;
          });
          
          // Marcar como vistos en el backend
          updateSeenProfiles(uniqueNewProfiles.map(profile => profile._id))
            .catch(err => console.error('Error actualizando perfiles vistos:', err));
        }
      }
    } catch (error) {
      console.error('Error cargando más perfiles:', error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  // Actualizar perfil visto cuando cambia el índice
  useEffect(() => {
    if (randomUsers.length > 0 && currentIndex < randomUsers.length) {
      const currentProfile = randomUsers[currentIndex];
      if (currentProfile && !seenProfileIds.has(currentProfile._id)) {
        // Añadir al set local
        setSeenProfileIds(prev => {
          const updated = new Set(prev);
          updated.add(currentProfile._id);
          return updated;
        });
        
        // Actualizar en el backend
        updateSeenProfiles([currentProfile._id])
          .catch(err => console.error('Error actualizando perfil visto:', err));
      }
      
      // Si estamos llegando al final, cargar más perfiles
      if (showRandom && currentIndex >= randomUsers.length - 2) {
        fetchMoreProfiles();
      }
    }
  }, [currentIndex, randomUsers, seenProfileIds, showRandom]);

  // Manejar cambio de índice (deslizamiento vertical)
  const handleSwipe = (direction) => {
    if (isProcessing || isScrollLimitReached) return;
    
    const currentList = showRandom ? randomUsers : likedUsers;
    
    if (direction === 'up' && currentIndex < currentList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'down' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Dar like a un perfil
  const handleLike = async () => {
    if (isProcessing || isLikeLimitReached) {
      if (isLikeLimitReached) {
        showLikeLimitDialog();
      }
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const currentList = showRandom ? randomUsers : likedUsers;
      if (currentIndex >= currentList.length) {
        setIsProcessing(false);
        return;
      }
      
      const currentProfile = currentList[currentIndex];
      
      // Mostrar animación de corazón
      if (singleUserViewRef.current && singleUserViewRef.current.showLikeAnimationInCenter) {
        singleUserViewRef.current.showLikeAnimationInCenter();
      }
      
      const result = await likeUser(currentProfile._id);
      
      if (result.success) {
        // Si hubo match, mostrar modal de match
        if (result.matchedUser) {
          // Aquí se mostraría el modal de match
          alert(`¡Has hecho match con ${currentProfile.username || 'este usuario'}!`);
        }
        
        // Eliminar el perfil de la lista
        if (showRandom) {
          setRandomUsers(prev => prev.filter((_, index) => index !== currentIndex));
          
          // Ajustar el índice si es necesario
          if (currentIndex >= randomUsers.length - 1) {
            setCurrentIndex(Math.max(0, randomUsers.length - 2));
          }
        } else {
          setLikedUsers(prev => prev.filter((_, index) => index !== currentIndex));
          
          // Ajustar el índice si es necesario
          if (currentIndex >= likedUsers.length - 1) {
            setCurrentIndex(Math.max(0, likedUsers.length - 2));
          }
        }
      } else if (result.limitReached) {
        // Si se alcanzó el límite de likes
        setIsLikeLimitReached(true);
        setLimitResetTime(new Date(result.resetAt));
        showLikeLimitDialog();
      }
    } catch (error) {
      console.error('Error dando like:', error);
      alert('Error al dar like. Inténtalo de nuevo más tarde.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Dar superlike a un perfil
  const handleSuperLike = async () => {
    if (isProcessing) return;
    
    // Verificar si el usuario tiene superlikes disponibles
    if (!user.isPremium && (user.topLikeCount <= 0)) {
      alert('No tienes SuperLikes disponibles. Compra más o hazte premium.');
      return;
    }
    
    if (!window.confirm('¿Seguro que quieres usar un SuperLike?')) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const currentList = showRandom ? randomUsers : likedUsers;
      if (currentIndex >= currentList.length) {
        setIsProcessing(false);
        return;
      }
      
      const currentProfile = currentList[currentIndex];
      const result = await superLikeUser(currentProfile._id);
      
      if (result.success) {
        // Si hubo match, mostrar modal de match
        if (result.matchedUser) {
          alert(`¡Has hecho match con ${currentProfile.username || 'este usuario'}!`);
        }
        
        // Eliminar el perfil de la lista
        if (showRandom) {
          setRandomUsers(prev => prev.filter((_, index) => index !== currentIndex));
          
          // Ajustar el índice si es necesario
          if (currentIndex >= randomUsers.length - 1) {
            setCurrentIndex(Math.max(0, randomUsers.length - 2));
          }
        } else {
          setLikedUsers(prev => prev.filter((_, index) => index !== currentIndex));
          
          // Ajustar el índice si es necesario
          if (currentIndex >= likedUsers.length - 1) {
            setCurrentIndex(Math.max(0, likedUsers.length - 2));
          }
        }
        
        alert('SuperLike enviado con éxito');
      }
    } catch (error) {
      console.error('Error dando superlike:', error);
      alert('Error al dar SuperLike. Inténtalo de nuevo más tarde.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Abrir modal de reporte
  const handleOpenReportModal = () => {
    const currentList = showRandom ? randomUsers : likedUsers;
    if (currentIndex < currentList.length) {
      setUserToReport(currentList[currentIndex]);
      setShowReportModal(true);
    }
  };

  // Enviar reporte
  const handleSendReport = async () => {
    if (!userToReport || !reportReason) {
      alert('Por favor selecciona una razón para el reporte');
      return;
    }
    
    try {
      const result = await reportUser(userToReport._id, reportReason, reportDetails);
      
      if (result.success) {
        alert(result.message || 'Usuario reportado con éxito');
        
        // Eliminar el perfil de la lista
        if (showRandom) {
          setRandomUsers(prev => prev.filter(user => user._id !== userToReport._id));
        } else {
          setLikedUsers(prev => prev.filter(user => user._id !== userToReport._id));
        }
        
        // Resetear estado del modal
        setShowReportModal(false);
        setUserToReport(null);
        setReportReason('');
        setReportDetails('');
      } else {
        alert(result.message || 'Error al reportar usuario');
      }
    } catch (error) {
      console.error('Error reportando usuario:', error);
      alert('Error al reportar usuario. Inténtalo de nuevo más tarde.');
    }
  };

  // Mostrar diálogo de límite de likes
  const showLikeLimitDialog = () => {
    if (!limitResetTime) return;
    
    const now = new Date();
    const hoursLeft = Math.ceil((limitResetTime - now) / (1000 * 60 * 60));
    
    alert(`Has alcanzado el límite de likes gratuitos. Podrás enviar más likes en aproximadamente ${hoursLeft} horas. Hazte premium para likes ilimitados.`);
  };

  // Cambiar entre modos "Random" y "Le gustas"
  const toggleMode = (mode) => {
    if (mode === 'random') {
      setShowRandom(true);
      setCurrentIndex(0);
    } else {
      // Si el usuario no es premium, mostrar mensaje
      if (!user.isPremium) {
        alert('Esta función es solo para usuarios premium');
        return;
      }
      
      setShowRandom(false);
      setCurrentIndex(0);
      fetchLikedUsers();
    }
  };

  // Renderizar pantalla de carga
  if (isLoading) {
    return (
      <div className="tiktok-screen loading">
        <div className="loading-spinner"></div>
        <p>Cargando perfiles...</p>
      </div>
    );
  }

  // Lista actual de perfiles según el modo
  const currentList = showRandom ? randomUsers : likedUsers;
  const currentProfile = currentList[currentIndex];

  return (
    <div className="tiktok-screen">
      {/* Barra superior */}
      <div className="top-bar">
        <button 
          className="report-button" 
          onClick={handleOpenReportModal}
        >
          ⚠️
        </button>
        
        <div className="mode-tabs">
          <button 
            className={`mode-tab ${showRandom ? 'active' : ''}`}
            onClick={() => toggleMode('random')}
          >
            Aleatorio
          </button>
          <button 
            className={`mode-tab ${!showRandom ? 'active' : ''}`}
            onClick={() => toggleMode('liked')}
          >
            Le gustas ({likedUsers.length})
          </button>
        </div>
        
        <button className="filter-button">
          <span>⚙️</span>
        </button>
      </div>
      
      {/* Contenedor principal de perfiles */}
      <div className="profiles-container">
        {currentList.length > 0 ? (
          <div 
            className="profile-swiper"
            onTouchStart={e => {
              touchStartYRef.current = e.touches[0].clientY;
            }}
            onTouchMove={e => {
              const touchY = e.touches[0].clientY;
              if (touchStartYRef.current - touchY > 50) {
                handleSwipe('up');
                touchStartYRef.current = touchY;
              } else if (touchY - touchStartYRef.current > 50) {
                handleSwipe('down');
                touchStartYRef.current = touchY;
              }
            }}
          >
            {/* Botón de reporte en esquina superior izquierda */}
            <button 
              className="report-button"
              onClick={() => handleOpenReportModal(currentProfile)}
              aria-label="Reportar perfil"
            >
              ⚠️
            </button>
            
            {/* Mostrar el perfil actual */}
            {currentProfile && (
              <SingleUserView 
                ref={singleUserViewRef}
                user={currentProfile}
                onDoubleTapLike={handleLike}
              />
            )}
            
            {/* Controles de navegación vertical */}
            <div className="swipe-controls">
              <button 
                className="swipe-button up"
                onClick={() => handleSwipe('down')}
                disabled={currentIndex === 0}
              >
                ▲
              </button>
              <button 
                className="swipe-button down"
                onClick={() => handleSwipe('up')}
                disabled={currentIndex === currentList.length - 1}
              >
                ▼
              </button>
            </div>
          </div>
        ) : (
          <div className="no-profiles">
            <p>No hay más perfiles disponibles</p>
            <button onClick={loadInitialProfiles}>Recargar</button>
          </div>
        )}
      </div>
      
      {/* Modal de reporte */}
      {showReportModal && (
        <div className="report-modal">
          <div className="report-modal-content">
            <h3>Reportar usuario</h3>
            
            <p>Selecciona una razón:</p>
            <select 
              value={reportReason} 
              onChange={e => setReportReason(e.target.value)}
            >
              <option value="">Selecciona una razón</option>
              <option value="inappropriate_photos">Fotos inapropiadas</option>
              <option value="fake_profile">Perfil falso</option>
              <option value="offensive_content">Contenido ofensivo</option>
              <option value="other">Otro</option>
            </select>
            
            {reportReason === 'other' && (
              <textarea
                placeholder="Detalla la razón del reporte"
                value={reportDetails}
                onChange={e => setReportDetails(e.target.value)}
              />
            )}
            
            <div className="report-modal-buttons">
              <button onClick={() => setShowReportModal(false)}>Cancelar</button>
              <button onClick={handleSendReport}>Enviar reporte</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Nombre de usuario en la parte inferior */}
      <div className="username-tag">
        <h3>{currentProfile?.username || 'Nereitaa'}</h3>
      </div>
    </div>
  );
};

export default TikTokLikeScreen;
