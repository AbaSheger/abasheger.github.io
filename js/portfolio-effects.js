// Add some interactive elements to the portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Customize skill network nodes based on CV skills
  initializeSkillNetwork();
  
  // Initialize project card interactions
  initializeProjectCards();
  
  // Initialize contact card interactions
  initializeContactCards();
  
  // Initialize language toggle
  initializeLanguageToggle();
  
  // Initialize scroll animations
  initializeScrollAnimations();
  
  // Initialize all animations and effects
  initFloatingElements();
  initProfileInteractions();
  initScrollAnimations();
  
  // Theme toggling if present
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

// Create and initialize skill network visualization based on CV skills
function initializeSkillNetwork() {
  const canvas = document.getElementById('skillNetworkCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;
  
  // Set canvas dimensions
  function setCanvasDimensions() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
  // Skills from CV, organized by category
  const skillsData = [
    // Backend & Programming
    { name: "Java", level: 95, category: "Backend" },
    { name: "Spring Boot", level: 90, category: "Backend" },
    { name: "REST APIs", level: 85, category: "Backend" },
    { name: "Maven", level: 80, category: "Backend" },
    { name: "MySQL", level: 85, category: "Backend" },
    { name: "H2", level: 75, category: "Backend" },
    { name: "JUnit", level: 80, category: "Backend" },
    { name: "Mockito", level: 75, category: "Backend" },
    { name: "TDD", level: 80, category: "Backend" },
    { name: "API Design", level: 85, category: "Backend" },
    
    // DevOps & CI/CD
    { name: "Docker", level: 85, category: "DevOps" },
    { name: "Docker Compose", level: 80, category: "DevOps" },
    { name: "Git", level: 85, category: "DevOps" },
    { name: "GitHub", level: 80, category: "DevOps" },
    { name: "Azure DevOps", level: 85, category: "DevOps" },
    
    // Frontend & UI
    { name: "React", level: 70, category: "Frontend" },
    { name: "JavaScript", level: 75, category: "Frontend" },
    { name: "TypeScript", level: 70, category: "Frontend" },
    { name: "HTML/CSS", level: 80, category: "Frontend" },
    
    // Agile & Other
    { name: "Scrum", level: 80, category: "Agile" },
    { name: "Kanban", level: 75, category: "Agile" },
    { name: "AI Basics", level: 65, category: "Agile" },
    { name: "Machine Learning", level: 60, category: "Agile" }
  ];
  
  // Create nodes
  const nodes = [];
  
  skillsData.forEach(skill => {
    // Create node
    nodes.push({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: skill.level / 10 + 10, // Size based on skill level
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      color: getColorForCategory(skill.category)
    });
  });
  
  // Colors for different skill categories
  function getColorForCategory(category) {
    if (category === 'Backend') return '#6c63ff';
    if (category === 'DevOps') return '#00d9c0';
    if (category === 'Frontend') return '#ff6b6b';
    return '#ffb347'; // Default color for other categories
  }
  
  // Function to draw connections between related nodes
  function drawConnections() {
    // Backend -> DevOps connections
    connectCategoryNodes('Backend', 'DevOps');
    
    // Backend -> Frontend connections
    connectCategoryNodes('Backend', 'Frontend');
    
    // Connect within same category
    ['Backend', 'DevOps', 'Frontend', 'Agile'].forEach(category => {
      connectWithinCategory(category);
    });
  }
  
  function connectCategoryNodes(category1, category2) {
    const cat1Nodes = nodes.filter(node => node.category === category1);
    const cat2Nodes = nodes.filter(node => node.category === category2);
    
    cat1Nodes.forEach(node1 => {
      cat2Nodes.forEach(node2 => {
        const dx = node1.x - node2.x;
        const dy = node1.y - node2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(180, 180, 220, ${Math.max(0, 0.3 - distance / 600)})`;
          ctx.lineWidth = Math.max(0.5, 2 - distance / 100);
          ctx.moveTo(node1.x, node1.y);
          ctx.lineTo(node2.x, node2.y);
          ctx.stroke();
        }
      });
    });
  }
  
  function connectWithinCategory(category) {
    const catNodes = nodes.filter(node => node.category === category);
    
    for (let i = 0; i < catNodes.length; i++) {
      for (let j = i + 1; j < catNodes.length; j++) {
        const node1 = catNodes[i];
        const node2 = catNodes[j];
        
        const dx = node1.x - node2.x;
        const dy = node1.y - node2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${hexToRgb(node1.color)}, ${Math.max(0, 0.5 - distance / 400)})`;
          ctx.lineWidth = Math.max(0.5, 3 - distance / 50);
          ctx.moveTo(node1.x, node1.y);
          ctx.lineTo(node2.x, node2.y);
          ctx.stroke();
        }
      });
    }
  }
  
  // Helper function to convert hex to rgb
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16)
      : '120,120,220';
  }
  
  // Draw nodes
  function drawNodes() {
    nodes.forEach(node => {
      // Draw node
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.radius
      );
      gradient.addColorStop(0, node.color);
      gradient.addColorStop(1, lightenColor(node.color, 30));
      
      ctx.fillStyle = gradient;
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw border
      ctx.beginPath();
      ctx.strokeStyle = darkenColor(node.color, 20);
      ctx.lineWidth = 1;
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw text
      if (node.radius > 15) {
        const fontSize = Math.min(12, node.radius / 2 + 6);
        ctx.font = `${fontSize}px var(--font-body)`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (node.name.length > 10) {
          // Abbreviate long names
          ctx.fillText(node.name.substring(0, 8) + '...', node.x, node.y);
        } else {
          ctx.fillText(node.name, node.x, node.y);
        }
      }
    });
  }
  
  // Helper functions to manipulate colors
  function lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt;
    return '#' + (
      (0x1000000 + (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      ).toString(16).slice(1)
    );
  }
  
  function darkenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = (num >> 8 & 0x00FF) - amt,
      B = (num & 0x0000FF) - amt;
    return '#' + (
      (0x1000000 + (R > 0 ? (R > 255 ? 255 : R) : 0) * 0x10000 +
        (G > 0 ? (G > 255 ? 255 : G) : 0) * 0x100 +
        (B > 0 ? (B > 255 ? 255 : B) : 0)
      ).toString(16).slice(1)
    );
  }
  
  // Update node positions for animation
  function updateNodes() {
    nodes.forEach(node => {
      // Move nodes
      node.x += node.vx;
      node.y += node.vy;
      
      // Bounce off edges
      if (node.x < node.radius || node.x > canvas.width - node.radius) {
        node.vx *= -1;
      }
      
      if (node.y < node.radius || node.y > canvas.height - node.radius) {
        node.vy *= -1;
      }
    });
  }
  
  // Mouse interaction
  let mouseX = null;
  let mouseY = null;
  
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  
  canvas.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
  });
  
  function handleMouseInteraction() {
    if (mouseX === null || mouseY === null) return;
    
    nodes.forEach(node => {
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Repel nodes from mouse
      if (distance < 100) {
        const force = 0.8 / Math.max(1, distance);
        node.vx -= (dx * force);
        node.vy -= (dy * force);
      }
      
      // Limit speed
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > 2) {
        node.vx = (node.vx / speed) * 2;
        node.vy = (node.vy / speed) * 2;
      }
    });
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections and nodes
    drawConnections();
    drawNodes();
    
    // Update for next frame
    updateNodes();
    handleMouseInteraction();
    
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  
  // Initialize skill progress bars
  setTimeout(() => {
    document.querySelectorAll('.skill-item').forEach(item => {
      const level = item.getAttribute('data-level') || '80';
      const bar = item.querySelector('.skill-bar');
      if (bar) {
        bar.style.width = `${level}%`;
      }
    });
  }, 300);
}

// Initialize project card interactions
function initializeProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const flipBtnFront = card.querySelector('.project-btn-flip');
    const flipBtnBack = card.querySelector('.project-btn-flip-back');
    
    if (flipBtnFront) {
      flipBtnFront.addEventListener('click', function() {
        card.classList.add('flipped');
      });
    }
    
    if (flipBtnBack) {
      flipBtnBack.addEventListener('click', function() {
        card.classList.remove('flipped');
      });
    }
    
    // Add 3D tilt effect on mouse movement
    if (window.innerWidth > 768) {  // Only on desktop
      card.addEventListener('mousemove', function(e) {
        if (!card.classList.contains('flipped')) {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;
          
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          // Calculate tilt values (max tilt: 10 degrees)
          const tiltX = (mouseY - cardCenterY) / (cardRect.height / 2) * 5;
          const tiltY = -((mouseX - cardCenterX) / (cardRect.width / 2)) * 5;
          
          // Apply transform
          this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
        }
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    }
  });
}

// Initialize contact card interactions
function initializeContactCards() {
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

// Initialize language toggle
function initializeLanguageToggle() {
  const languageToggle = document.getElementById('language-toggle');
  let currentLang = 'en'; // Default language
  
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      // Toggle language
      currentLang = currentLang === 'en' ? 'sv' : 'en';
      
      // Update button display
      if (currentLang === 'en') {
        languageToggle.innerHTML = '<span class="lang-flag">🇬🇧</span><span class="lang-text">EN</span>';
        languageToggle.setAttribute('aria-label', 'Switch to Swedish');
      } else {
        languageToggle.innerHTML = '<span class="lang-flag">🇸🇪</span><span class="lang-text">SV</span>';
        languageToggle.setAttribute('aria-label', 'Switch to English');
      }
      
      // Update all translatable elements
      const translatableElements = document.querySelectorAll('[data-translate]');
      
      translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        
        // For text elements, directly update the text
        if (!key.includes('_sv')) {
          if (currentLang === 'sv' && document.querySelector(`[data-translate="${key}_sv"]`)) {
            element.classList.add('hidden');
            document.querySelector(`[data-translate="${key}_sv"]`).classList.remove('hidden');
          } else if (currentLang === 'en') {
            element.classList.remove('hidden');
            const svElement = document.querySelector(`[data-translate="${key}_sv"]`);
            if (svElement) svElement.classList.add('hidden');
          }
        }
      });
      
      // Update timeline content based on language
      updateTimelineContent(currentLang);
    });
  }
}

// Update CV timeline content based on language
function updateTimelineContent(lang) {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (lang === 'sv') {
    // Update to Swedish
    if (timelineItems.length >= 1) {
      timelineItems[0].querySelector('h4').textContent = 'Systemutvecklare';
      timelineItems[0].querySelector('p').textContent = 'Java-utvecklare som bygger skalbara backend-lösningar';
    }
    if (timelineItems.length >= 2) {
      timelineItems[1].querySelector('h4').textContent = 'Junior Java-utvecklare';
      timelineItems[1].querySelector('p').textContent = 'Arbete med mikrotjänster och MySQL-databaser';
    }
    if (timelineItems.length >= 3) {
      timelineItems[2].querySelector('h4').textContent = 'DevOps-praktikant';
      timelineItems[2].querySelector('p').textContent = 'Lärde mig CI/CD-pipelines och Docker-containerisering';
    }
    
    // Update timeline header
    const timelineHeader = document.querySelector('.timeline-header h3');
    if (timelineHeader) {
      timelineHeader.textContent = 'Professionell Tidslinje';
    }
    
    // Update CV card content
    const cvCardTitle = document.querySelector('.cv-card h3');
    const cvCardText = document.querySelector('.cv-card p');
    
    if (cvCardTitle) cvCardTitle.textContent = 'Mitt CV';
    if (cvCardText) cvCardText.textContent = 'Ladda ner mitt kompletta CV för att lära dig mer om min erfarenhet, utbildning och kompetenser.';
  } else {
    // Update to English
    if (timelineItems.length >= 1) {
      timelineItems[0].querySelector('h4').textContent = 'Backend Developer';
      timelineItems[0].querySelector('p').textContent = 'Java Developer building scalable backend solutions';
    }
    if (timelineItems.length >= 2) {
      timelineItems[1].querySelector('h4').textContent = 'Junior Java Developer';
      timelineItems[1].querySelector('p').textContent = 'Working with microservices and MySQL databases';
    }
    if (timelineItems.length >= 3) {
      timelineItems[2].querySelector('h4').textContent = 'DevOps Intern';
      timelineItems[2].querySelector('p').textContent = 'Learning CI/CD pipelines and Docker containerization';
    }
    
    // Update timeline header
    const timelineHeader = document.querySelector('.timeline-header h3');
    if (timelineHeader) {
      timelineHeader.textContent = 'Professional Timeline';
    }
    
    // Update CV card content
    const cvCardTitle = document.querySelector('.cv-card h3');
    const cvCardText = document.querySelector('.cv-card p');
    
    if (cvCardTitle) cvCardTitle.textContent = 'My Resume';
    if (cvCardText) cvCardText.textContent = 'Download my complete resume to learn more about my experience, education, and skills.';
  }
}

// Initialize scroll animations
function initializeScrollAnimations() {
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
  const contactItems = document.querySelectorAll('.contact-item, .contact-card-wrapper');
  contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transitionDelay = `${index * 0.1}s`;
  });
  createScrollAnimationObserver(contactItems, 'animate-contact-item');
  
  // Timeline items with staggered animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(30px)';
    item.style.transitionDelay = `${index * 0.15}s`;
  });
  createScrollAnimationObserver(timelineItems, 'animate-timeline-item');
}

// Add global header scroll effect
document.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Float animation for elements with float-animation class
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.float-animation');
  
  floatingElements.forEach(element => {
    // Add a random initial delay for each element to create variety
    const delay = Math.random() * 2;
    element.style.animationDelay = `${delay}s`;
  });
}

// Profile picture special effects and interactions
function initProfileInteractions() {
  const profilePicture = document.getElementById('profile-picture');
  const profileContainer = document.querySelector('.hero-profile-image');
  
  if (!profilePicture || !profileContainer) return;
  
  // Click effect for profile picture
  profileContainer.addEventListener('click', function(e) {
    // Add clicked class for animation
    profileContainer.classList.add('clicked');
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.classList.add('profile-ripple');
    profileContainer.appendChild(ripple);
    
    // Create particles bursting from the click point
    createProfileParticles(e, profileContainer);
    
    // Remove clicked class after animation completes
    setTimeout(() => {
      profileContainer.classList.remove('clicked');
    }, 600);
    
    // Remove ripple element after animation
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });
  
  // Hover effect for subtle rotation
  profileContainer.addEventListener('mouseenter', function() {
    profilePicture.style.transform = 'scale(1.05) rotate(2deg)';
  });
  
  profileContainer.addEventListener('mouseleave', function() {
    profilePicture.style.transform = 'scale(1) rotate(0deg)';
  });
  
  // Mobile touch support
  profileContainer.addEventListener('touchstart', function(e) {
    // Prevent default touch behavior
    e.preventDefault();
    
    // Trigger the click effect
    profileContainer.classList.add('clicked');
    
    // Create touch ripple
    const touch = e.touches[0];
    const rect = profileContainer.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Create ripple at touch point
    const ripple = document.createElement('div');
    ripple.classList.add('profile-ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    profileContainer.appendChild(ripple);
    
    // Create particles from touch point
    createProfileParticles(e, profileContainer, x, y);
    
    // Cleanup
    setTimeout(() => {
      profileContainer.classList.remove('clicked');
    }, 600);
    
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });
  
  profileContainer.addEventListener('touchend', function() {
    profilePicture.style.transform = 'scale(1) rotate(0deg)';
  });
}

// Create particle burst effect for profile picture
function createProfileParticles(event, container, x, y) {
  // Number of particles to create
  const particleCount = 15;
  
  // Get click/touch position relative to the container
  let posX, posY;
  
  if (x !== undefined && y !== undefined) {
    // Use provided coordinates (for touch events)
    posX = x;
    posY = y;
  } else {
    // Calculate from mouse event
    const rect = container.getBoundingClientRect();
    posX = event.clientX - rect.left;
    posY = event.clientY - rect.top;
  }
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('profile-particle');
    
    // Randomize particle properties
    const size = Math.random() * 8 + 4;
    const angle = Math.random() * 360;
    const distance = Math.random() * 100 + 50;
    const duration = Math.random() * 0.5 + 1;
    
    // Set styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.backgroundColor = getRandomColor();
    particle.style.animationDuration = `${duration}s`;
    
    // Set unique trajectory for each particle
    particle.style.transform = `translate(0, 0) rotate(0deg)`;
    particle.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);
    
    // Add to container
    container.appendChild(particle);
    
    // Remove after animation completes
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }
}

// Helper function to get random colors in the theme palette
function getRandomColor() {
  const colors = [
    'var(--primary-color)',
    'var(--secondary-color)',
    'var(--accent-color)',
    'rgba(var(--primary-rgb), 0.8)',
    'rgba(var(--secondary-rgb), 0.8)'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Scroll animations
function initScrollAnimations() {
  // Add scroll animation observers here
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');
  
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Theme toggling functionality
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDarkMode = document.body.classList.contains('dark-theme');
  
  // Save theme preference to localStorage
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update toggle icon if needed
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
  }
}
