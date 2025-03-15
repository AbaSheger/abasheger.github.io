// Add some interactive elements to the portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Animate skill bars on scroll
  const skillsSection = document.getElementById('skills');
  
  if (skillsSection) {
    const skillItems = skillsSection.querySelectorAll('.skill-item');
    
    // Create a subtle animation when hovering over skill categories
    const skillCategories = skillsSection.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
      category.addEventListener('mouseenter', () => {
        const items = category.querySelectorAll('.skill-item');
        items.forEach((item, index) => {
          item.style.transitionDelay = `${index * 50}ms`;
          item.classList.add('skill-highlight');
        });
      });
      
      category.addEventListener('mouseleave', () => {
        const items = category.querySelectorAll('.skill-item');
        items.forEach(item => {
          item.style.transitionDelay = '0ms';
          item.classList.remove('skill-highlight');
        });
      });
    });
  }
  
  // Add a subtle parallax effect to the hero background
  const heroBackground = document.querySelector('.hero-background');
  if (heroBackground) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 600) {
        heroBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    });
  }
  
  // Make project cards interactive
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('active');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('active');
    });
  });
  
  // Add subtle interactions to navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });
});
