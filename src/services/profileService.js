// Servicio para manejar operaciones relacionadas con perfiles de usuario
import { getToken } from './authService';

const API_URL = 'https://gymder-api-production.up.railway.app/api';

/**
 * Obtiene perfiles sugeridos para el usuario actual
 * @param {Object} filters - Filtros opcionales (edad, peso, altura, etc.)
 * @param {number} limit - Número de perfiles a obtener
 * @param {number} skip - Número de perfiles a saltar (para paginación)
 * @returns {Promise} - Promesa con perfiles sugeridos
 */
export const getSuggestedProfiles = async (filters = {}, limit = 20, skip = 0) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    // Preparar parámetros de consulta
    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit.toString());
    queryParams.append('skip', skip.toString());
    
    // Añadir filtros si existen
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        queryParams.append(key, filters[key].toString());
      }
    });

    const response = await fetch(`${API_URL}/matches/suggested?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener perfiles');
    }
    
    return data;
  } catch (error) {
    console.error('Error en getSuggestedProfiles:', error);
    throw error;
  }
};

/**
 * Obtiene los usuarios que han dado like al usuario actual
 * @returns {Promise} - Promesa con usuarios que han dado like
 */
export const getLikedUsers = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/likes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener usuarios que te han dado like');
    }
    
    return data;
  } catch (error) {
    console.error('Error en getLikedUsers:', error);
    throw error;
  }
};

/**
 * Da like a un usuario
 * @param {string} userId - ID del usuario a dar like
 * @returns {Promise} - Promesa con resultado del like
 */
export const likeUser = async (userId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/like/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al dar like');
    }
    
    return data;
  } catch (error) {
    console.error('Error en likeUser:', error);
    throw error;
  }
};

/**
 * Da superlike a un usuario
 * @param {string} userId - ID del usuario a dar superlike
 * @returns {Promise} - Promesa con resultado del superlike
 */
export const superLikeUser = async (userId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/top_like/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al dar superlike');
    }
    
    return data;
  } catch (error) {
    console.error('Error en superLikeUser:', error);
    throw error;
  }
};

/**
 * Actualiza la lista de perfiles vistos por el usuario
 * @param {Array} profileIds - Array de IDs de perfiles vistos
 * @returns {Promise} - Promesa con resultado de la actualización
 */
export const updateSeenProfiles = async (profileIds) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/matches/seen`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ seen: profileIds })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar perfiles vistos');
    }
    
    return data;
  } catch (error) {
    console.error('Error en updateSeenProfiles:', error);
    throw error;
  }
};

/**
 * Reporta un usuario
 * @param {string} userId - ID del usuario a reportar
 * @param {string} reason - Razón del reporte
 * @param {string} details - Detalles adicionales
 * @returns {Promise} - Promesa con resultado del reporte
 */
export const reportUser = async (userId, reason, details = '') => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/report/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reason, details })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al reportar usuario');
    }
    
    return data;
  } catch (error) {
    console.error('Error en reportUser:', error);
    throw error;
  }
};
