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

  // Initialize skill network visualization
  initializeSkillNetwork();
});

// Create and initialize skill network visualization
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
  
  // Get all skill items and create nodes
  const skillItems = document.querySelectorAll('.skill-item');
  const nodes = [];
  
  skillItems.forEach(item => {
    const skillName = item.querySelector('span').textContent;
    const skillLevel = parseInt(item.getAttribute('data-level')) || 80;
    const category = item.closest('.skill-category').querySelector('h3').textContent;
    
    // Create node
    nodes.push({
      name: skillName,
      level: skillLevel,
      category: category,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: skillLevel / 10 + 10, // Size based on skill level
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      color: getColorForCategory(category)
    });
  });
  
  // Colors for different skill categories
  function getColorForCategory(category) {
    if (category.includes('Backend')) return '#6c63ff';
    if (category.includes('DevOps')) return '#00d9c0';
    if (category.includes('Frontend')) return '#ff6b6b';
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
    const cat1Nodes = nodes.filter(node => node.category.includes(category1));
    const cat2Nodes = nodes.filter(node => node.category.includes(category2));
    
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
    const catNodes = nodes.filter(node => node.category.includes(category));
    
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
      }
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
