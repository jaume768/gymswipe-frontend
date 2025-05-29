// Función para bloquear el scroll del cuerpo cuando se abre el menú
export const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

// Función para habilitar el scroll del cuerpo cuando se cierra el menú
export const enableBodyScroll = () => {
  document.body.style.overflow = '';
};
