document.addEventListener('DOMContentLoaded', function() {
  // Create an animation for elements appearing on scroll
  function createScrollAnimationObserver(elements, animationClass, threshold = 0.2) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          // Unobserve after animation is added
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });
    
    elements.forEach(el => observer.observe(el));
  }
  
  // Section titles animation
  const sectionTitles = document.querySelectorAll('section h2');
  createScrollAnimationObserver(sectionTitles, 'animate-title');
  
  // Project cards animation with staggered delay
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  createScrollAnimationObserver(projectCards, 'animate-card');
  
  // Skill categories with staggered animation
  const skillCategories = document.querySelectorAll('.skill-category');
  skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transitionDelay = `${index * 0.1}s`;
  });
  createScrollAnimationObserver(skillCategories, 'animate-skill-category');
  
  // Contact items animation
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transitionDelay = `${index * 0.1}s`;
  });
  createScrollAnimationObserver(contactItems, 'animate-contact-item');
  
  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      
      if (scrolled < heroSection.offsetHeight) {
        const parallaxValue = scrolled * 0.4;
        heroBackground.style.transform = `translateY(${parallaxValue}px)`;
      }
    });
  }
  
  // Floating animation for profile picture
  const profilePicture = document.querySelector('.hero-profile-image');
  if (profilePicture) {
    setInterval(() => {
      profilePicture.classList.toggle('float-animation');
    }, 3000);
  }
  
  // Add contact card functionality
  initContactCards();
});

// Add contact card flip functionality
function initContactCards() {
  const contactCards = document.querySelectorAll('.contact-card');
  
  contactCards.forEach(card => {
    const flipBtn = card.querySelector('.contact-card-flip-btn');
    const flipBackBtn = card.querySelector('.contact-card-flip-back-btn');
    
    if (flipBtn) {
      flipBtn.addEventListener('click', () => {
        card.classList.add('flipped');
      });
    }
    
    if (flipBackBtn) {
      flipBackBtn.addEventListener('click', () => {
        card.classList.remove('flipped');
      });
    }
  });
}
