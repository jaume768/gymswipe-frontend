// Función para desplazamiento suave tipo "swipe" entre secciones
export const scrollToSection = (e, sectionId) => {
  e.preventDefault();
  
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  const navHeight = 80; // Altura aproximada de la barra de navegación
  const offsetTop = section.offsetTop - navHeight;

  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
};
