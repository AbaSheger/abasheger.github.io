import { useEffect, useRef } from 'react';

export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('animate-fadeInUp');
        element.style.opacity = '1';
        observer.unobserve(element);
      }
    }, defaultOptions);

    if (element) {
      element.style.opacity = '0';
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return elementRef;
}; 