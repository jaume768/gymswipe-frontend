// Archivo: authService.js
// Gestiona todas las operaciones relacionadas con la autenticación

const API_URL = 'https://gymder-api-production.up.railway.app/api';

/**
 * Inicia sesión con email/username y contraseña
 * @param {string} identifier - Email o nombre de usuario
 * @param {string} password - Contraseña
 * @returns {Promise} - Promesa con resultado del login
 */
export const login = async (identifier, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: identifier, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }
    
    // Guardar token y datos de usuario en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

/**
 * Inicia sesión con Google
 * @param {string} googleToken - Token de autenticación de Google
 * @returns {Promise} - Promesa con resultado del login
 */
export const googleLogin = async (googleToken) => {
  try {
    const response = await fetch(`${API_URL}/users/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: googleToken }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión con Google');
    }
    
    // Guardar token y datos de usuario en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    console.error('Error en googleLogin:', error);
    throw error;
  }
};

/**
 * Cierra la sesión del usuario
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean} - true si está autenticado, false en caso contrario
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Obtiene el token JWT almacenado
 * @returns {string|null} - Token JWT o null si no existe
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Obtiene los datos del usuario autenticado
 * @returns {Object|null} - Datos del usuario o null si no existe
 */
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
