document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  for (const link of links) {
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
      
      // Update button display
      if (currentLang === 'en') {
        languageToggle.innerHTML = '<span class="lang-flag">🇬🇧</span><span class="lang-text">English</span><i class="fas fa-chevron-down" aria-hidden="true"></i>';
        languageToggle.setAttribute('aria-label', 'Switch to Swedish');
      } else {
        languageToggle.innerHTML = '<span class="lang-flag">🇸🇪</span><span class="lang-text">Svenska</span><i class="fas fa-chevron-down" aria-hidden="true"></i>';
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

  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Active navigation link highlighting
  function highlightNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
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
});
