document.addEventListener('DOMContentLoaded', function() {
  // Add any JavaScript for interactive elements here

  // Example: Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  for (const link of links) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }

  // Add interactive elements for a more engaging user experience
  const sections = document.querySelectorAll('section');
  const options = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
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
          top: targetElement.offsetTop - 60, // Adjust for fixed header height
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

  // Add JavaScript code to handle the language toggle feature
  const languageToggle = document.getElementById('language-toggle');
  const elementsToTranslate = document.querySelectorAll('[data-translate]');

  const translations = {
    en: {
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      skills: 'Skills',
      cv: 'CV',
      apps: 'Apps',
      heroTitle: 'Abenezer Anglo',
      heroSubtitle: 'Java Developer',
      heroTagline: 'Building scalable, reliable systems for efficient data management',
      contactMe: 'Contact Me',
      viewProjects: 'View Projects',
      aboutTitle: 'About',
      aboutContent: 'Borlänge, Sverige | 📞 +46764087919 | 📧 merebanglo@yahoo.com',
      projectsTitle: 'Projects',
      contactTitle: 'Contact',
      skillsTitle: 'Skills',
      cvTitle: 'CV',
      downloadCV: 'Download CV',
      uploadCV: 'Upload CV',
      appsTitle: 'Apps'
    },
    sv: {
      about: 'Om',
      projects: 'Projekt',
      contact: 'Kontakt',
      skills: 'Färdigheter',
      cv: 'CV',
      apps: 'Appar',
      heroTitle: 'Abenezer Anglo',
      heroSubtitle: 'Java-utvecklare',
      heroTagline: 'Bygger skalbara, pålitliga system för effektiv datahantering',
      contactMe: 'Kontakta mig',
      viewProjects: 'Visa projekt',
      aboutTitle: 'Om',
      aboutContent: 'Borlänge, Sverige | 📞 +46764087919 | 📧 merebanglo@yahoo.com',
      projectsTitle: 'Projekt',
      contactTitle: 'Kontakt',
      skillsTitle: 'Färdigheter',
      cvTitle: 'CV',
      downloadCV: 'Ladda ner CV',
      uploadCV: 'Ladda upp CV',
      appsTitle: 'Appar'
    }
  };

  let currentLanguage = 'en';

  languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'sv' : 'en';
    elementsToTranslate.forEach(element => {
      const key = element.getAttribute('data-translate');
      element.textContent = translations[currentLanguage][key];
    });
  });

  // Add JavaScript code to handle CV upload
  const cvUploadInput = document.getElementById('cv-upload');
  cvUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      // Handle the file upload (e.g., send it to the server or display a success message)
      console.log('CV uploaded:', file.name);
    } else {
      alert('Please upload a PDF file.');
    }
  });

});
