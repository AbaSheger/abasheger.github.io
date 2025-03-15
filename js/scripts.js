document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('show');
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('show');
      }
    });
  }
  
  // Enhanced smooth scrolling
  const links = document.querySelectorAll('a[href^="#"]');
  for (const link of links) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Adjust offset based on screen size
        const headerHeight = window.innerWidth <= 768 ? 60 : 70;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  }

  // Add any JavaScript for interactive elements here

  // Add interactive elements for a more engaging user experience
  const sections = document.querySelectorAll('section');
  const options = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Implement animations and transitions for UI elements
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
      this.classList.add('hovered');
    });
    link.addEventListener('mouseout', function() {
      this.classList.remove('hovered');
    });
  });

  // Update smooth scrolling to work with the new navigation menu
  const navMenuLinks = document.querySelectorAll('nav a[href^="#"]');
  for (const link of navMenuLinks) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  }

  // Add advanced animations and transitions for interactive elements
  const animatedElements = document.querySelectorAll('.animated');
  animatedElements.forEach(element => {
    element.addEventListener('mouseover', function() {
      this.classList.add('animate');
    });
    element.addEventListener('mouseout', function() {
      this.classList.remove('animate');
    });
  });

  // Add subtle animations for interactive elements
  animatedElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.classList.add('animate-pulse');
    });
    element.addEventListener('mouseleave', function() {
      this.classList.remove('animate-pulse');
    });
  });

  // Implement hover effects for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('scale-[1.01]');
      this.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', function() {
      this.classList.remove('scale-[1.01]');
    });
  });

  // Enhanced 3D project card flip animation
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

  // Implement additional interactive elements for a more engaging user experience
  const interactiveElements = document.querySelectorAll('.interactive');
  interactiveElements.forEach(element => {
    element.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  // Add active class to the current navigation item
  const updateActiveNav = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    window.addEventListener('scroll', () => {
      let fromTop = window.scrollY + 100;
      
      sections.forEach(section => {
        if (section.offsetTop <= fromTop && 
            section.offsetTop + section.offsetHeight > fromTop) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
          link.classList.add('active');
        }
      });
    });
  };

  // Call the function
  updateActiveNav();

  // Add JavaScript code to handle the improved language toggle feature
  const languageToggle = document.getElementById('language-toggle');
  let currentLang = 'en'; // Default language
  
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      // Toggle language
      currentLang = currentLang === 'en' ? 'sv' : 'en';
      
      // Update button display - Simplified for mobile
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
      
      // Translation for navigation with icons
      if (currentLang === 'sv') {
        document.querySelectorAll('[data-translate="about"]').forEach(el => {
          if (el.tagName === 'A') {
            const icon = el.querySelector('i');
            if (icon) {
              el.innerHTML = '';
              el.appendChild(icon);
              el.appendChild(document.createTextNode(' Om Mig'));
            } else {
              el.textContent = 'Om Mig';
            }
          } else {
            el.textContent = 'Om Mig';
          }
        });
        
        // Similar pattern for other navigation items
        document.querySelector('[data-translate="projects"]').textContent = 'Projekt';
        document.querySelector('[data-translate="contact"]').textContent = 'Kontakt';
        document.querySelector('[data-translate="skills"]').textContent = 'Färdigheter';
        document.querySelector('[data-translate="cv"]').textContent = 'CV';
        document.querySelector('[data-translate="apps"]').textContent = 'Applikationer';
        document.querySelector('[data-translate="contactMe"]').textContent = 'Kontakta Mig';
        document.querySelector('[data-translate="viewProjects"]').textContent = 'Visa Projekt';
        document.querySelector('[data-translate="aboutTitle"]').textContent = 'Om Mig';
        document.querySelector('[data-translate="projectsTitle"]').textContent = 'Projekt';
        document.querySelector('[data-translate="contactTitle"]').textContent = 'Kontakt';
        document.querySelector('[data-translate="skillsTitle"]').textContent = 'Färdigheter';
        document.querySelector('[data-translate="cvTitle"]').textContent = 'CV';
        document.querySelector('[data-translate="appsTitle"]').textContent = 'Applikationer';
        document.querySelector('[data-translate="downloadCV"]').textContent = 'Ladda Ner CV';
        document.querySelector('[data-translate="uploadCV"]').textContent = 'Ladda Upp CV';
        document.querySelector('[data-translate="formName"]').textContent = 'Namn';
        document.querySelector('[data-translate="formEmail"]').textContent = 'E-post';
        document.querySelector('[data-translate="formMessage"]').textContent = 'Meddelande';
        document.querySelector('[data-translate="formSubmit"]').textContent = 'Skicka Meddelande';
        document.querySelectorAll('[data-translate="liveDemo"]').forEach(el => el.textContent = 'Live Demo');
        document.querySelectorAll('[data-translate="githubRepo"]').forEach(el => el.textContent = 'GitHub Repo');
        document.querySelector('[data-translate="skillsBackend"]').textContent = 'Backend & Programmering';
        document.querySelector('[data-translate="skillsDevOps"]').textContent = 'DevOps & CI/CD';
        document.querySelector('[data-translate="skillsFrontend"]').textContent = 'Frontend & UI';
        document.querySelector('[data-translate="skillsOther"]').textContent = 'Agilt & Annat';
        document.querySelector('[data-translate="quickLinks"]').textContent = 'Snabblänkar';
        document.querySelector('[data-translate="connect"]').textContent = 'Anslut';
        document.querySelector('[data-translate="allRights"]').textContent = 'Alla rättigheter förbehållna.';
        document.querySelector('[data-translate="contactCta"]').classList.add('hidden');
        document.querySelector('[data-translate="contactCta_sv"]').classList.remove('hidden');
        document.querySelector('[data-translate="emailMe"]').textContent = 'Mejla mig';
      } else {
        document.querySelectorAll('[data-translate="about"]').forEach(el => {
          if (el.tagName === 'A') {
            const icon = el.querySelector('i');
            if (icon) {
              el.innerHTML = '';
              el.appendChild(icon);
              el.appendChild(document.createTextNode(' About'));
            } else {
              el.textContent = 'About';
            }
          } else {
            el.textContent = 'About';
          }
        });
        
        // Similar pattern for other navigation items
        document.querySelector('[data-translate="projects"]').textContent = 'Projects';
        document.querySelector('[data-translate="contact"]').textContent = 'Contact';
        document.querySelector('[data-translate="skills"]').textContent = 'Skills';
        document.querySelector('[data-translate="cv"]').textContent = 'CV';
        document.querySelector('[data-translate="apps"]').textContent = 'Apps';
        document.querySelector('[data-translate="contactMe"]').textContent = 'Contact Me';
        document.querySelector('[data-translate="viewProjects"]').textContent = 'View Projects';
        document.querySelector('[data-translate="aboutTitle"]').textContent = 'About';
        document.querySelector('[data-translate="projectsTitle"]').textContent = 'Projects';
        document.querySelector('[data-translate="contactTitle"]').textContent = 'Contact';
        document.querySelector('[data-translate="skillsTitle"]').textContent = 'Skills';
        document.querySelector('[data-translate="cvTitle"]').textContent = 'CV';
        document.querySelector('[data-translate="appsTitle"]').textContent = 'Apps';
        document.querySelector('[data-translate="downloadCV"]').textContent = 'Download CV';
        document.querySelector('[data-translate="uploadCV"]').textContent = 'Upload CV';
        document.querySelector('[data-translate="formName"]').textContent = 'Name';
        document.querySelector('[data-translate="formEmail"]').textContent = 'Email';
        document.querySelector('[data-translate="formMessage"]').textContent = 'Message';
        document.querySelector('[data-translate="formSubmit"]').textContent = 'Send Message';
        document.querySelectorAll('[data-translate="liveDemo"]').forEach(el => el.textContent = 'Live Demo');
        document.querySelectorAll('[data-translate="githubRepo"]').forEach(el => el.textContent = 'GitHub Repo');
        document.querySelector('[data-translate="skillsBackend"]').textContent = 'Backend & Programming';
        document.querySelector('[data-translate="skillsDevOps"]').textContent = 'DevOps & CI/CD';
        document.querySelector('[data-translate="skillsFrontend"]').textContent = 'Frontend & UI';
        document.querySelector('[data-translate="skillsOther"]').textContent = 'Agile & Other';
        document.querySelector('[data-translate="quickLinks"]').textContent = 'Quick Links';
        document.querySelector('[data-translate="connect"]').textContent = 'Connect';
        document.querySelector('[data-translate="allRights"]').textContent = 'All rights reserved.';
        document.querySelector('[data-translate="contactCta"]').classList.remove('hidden');
        if (document.querySelector('[data-translate="contactCta_sv"]')) {
          document.querySelector('[data-translate="contactCta_sv"]').classList.add('hidden');
        }
        document.querySelector('[data-translate="emailMe"]').textContent = 'Email Me';
      }
    });
  }

  // Add JavaScript code to handle CV upload
  const cvUpload = document.getElementById('cv-upload');
  if (cvUpload) {
    cvUpload.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        // Display a message that the file was selected
        const uploadStatus = document.getElementById('upload-status');
        uploadStatus.textContent = `Selected file: ${file.name}`;
        uploadStatus.style.color = 'var(--primary-color)';
      }
    });
  }

  // Header scroll effect with improved performance
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  const scrollThreshold = 5;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only update class if we've scrolled enough (performance optimization)
    if (Math.abs(lastScrollTop - scrollTop) > scrollThreshold) {
      if (scrollTop > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScrollTop = scrollTop;
    }
  });

  // More responsive active navigation link highlighting
  function highlightNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + (window.innerHeight / 3);
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const id = section.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
  
  highlightNavigation();

  // New interactive scroll effect for hero video
  window.addEventListener('scroll', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
      const opacity = Math.max(0.5, 1 - window.scrollY / 500);
      heroVideo.style.opacity = opacity;
    }
  });

  // Remove theme toggle functionality

  // Add micro-interactions to various elements
  function addMicroInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .project-btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Add tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 20;
        const tiltY = -(x - centerX) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      });
    });
    
    // Add hover effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        // Create a subtle pulse effect on sibling items
        const siblings = Array.from(this.parentNode.children).filter(sibling => sibling !== this);
        siblings.forEach(sibling => {
          sibling.style.transform = 'scale(0.95)';
          sibling.style.opacity = '0.7';
        });
      });
      
      item.addEventListener('mouseleave', function() {
        // Reset siblings
        const siblings = Array.from(this.parentNode.children);
        siblings.forEach(sibling => {
          sibling.style.transform = '';
          sibling.style.opacity = '';
        });
      });
    });
  }

  // Call the new function
  addMicroInteractions();

  // Create a scroll progress indicator
  function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.background = 'linear-gradient(90deg, var(--primary-color), var(--accent-color))';
    progressBar.style.width = '0%';
    progressBar.style.zIndex = '1002';
    progressBar.style.transition = 'width 0.1s';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    });
  }
  
  createScrollProgressIndicator();

  // Add focus styles to form inputs for better accessibility
  const formInputs = document.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentNode.classList.add('input-focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentNode.classList.remove('input-focused');
      }
    });
  });
});
