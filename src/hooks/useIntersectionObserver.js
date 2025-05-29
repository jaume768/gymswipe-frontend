import { useState, useEffect, useRef } from 'react';

// Hook personalizado para detectar cuando un elemento entra en el viewport
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Actualizar el estado cuando el elemento entra/sale del viewport
      setIsVisible(entry.isIntersecting);
    }, {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1, // Visible cuando al menos 10% del elemento está en viewport
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Limpiar el observer al desmontar
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

export default useIntersectionObserver;
