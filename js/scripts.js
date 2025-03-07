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
});
