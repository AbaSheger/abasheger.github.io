document.addEventListener('DOMContentLoaded', function() {
  // Only initialize if hero section exists
  const heroSection = document.querySelector('.hero-background');
  if (!heroSection) return;
  
  // Create canvas element for particles
  const canvas = document.querySelector('.particles-canvas');
  if (!canvas) return;
  
  // Get canvas context
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions
  const setCanvasDimensions = () => {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  };
  
  // Call on load and on resize
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
  // Updated particle settings for a more creative effect
  const particleCount = 60;
  const particleColors = [
    'rgba(108, 99, 255, 0.6)',   // Primary color (purple)
    'rgba(0, 217, 192, 0.5)',    // Secondary color (turquoise)
    'rgba(255, 107, 107, 0.5)',  // Accent color (coral)
    'rgba(255, 255, 255, 0.3)'   // White
  ];
  const minSize = 2;
  const maxSize = 6;
  const minSpeed = 0.2;
  const maxSpeed = 0.8;
  const connectionDistance = 120;
  const connectionOpacity = 0.2;
  
  // Particle array
  const particles = [];
  
  // Create particles with more variety
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: minSize + Math.random() * (maxSize - minSize),
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      // Add rotation for more dynamic movement
      angle: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
      // Add pulse effect
      pulseSize: 0,
      pulseSpeed: 0.03 + Math.random() * 0.03,
      pulseDirection: 1
    });
  }
  
  // Update particles with improved animation
  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // First draw connections
    ctx.lineWidth = 1;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          // Get the base color for connection
          const particleColor = particles[i].color;
          const rgbaMatch = particleColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([.\d]+)\)/);
          const connectionColor = rgbaMatch ? 
            `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${connectionOpacity * (1 - distance / connectionDistance)})` :
            `rgba(255, 255, 255, ${connectionOpacity * (1 - distance / connectionDistance)})`;
            
          ctx.beginPath();
          ctx.strokeStyle = connectionColor;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Then draw particles with enhanced effects
    particles.forEach(particle => {
      // Calculate pulse effect
      particle.pulseSize += particle.pulseSpeed * particle.pulseDirection;
      if (particle.pulseSize > 0.5 || particle.pulseSize < 0) {
        particle.pulseDirection *= -1;
      }
      
      const currentSize = particle.size * (1 + particle.pulseSize * 0.3);
      
      // Draw particle with gradient
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, currentSize
      );
      
      // Extract base color for gradient
      const rgbaMatch = particle.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([.\d]+)\)/);
      if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1]);
        const g = parseInt(rgbaMatch[2]);
        const b = parseInt(rgbaMatch[3]);
        const a = parseFloat(rgbaMatch[4]);
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      } else {
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Update rotation
      particle.angle += particle.rotationSpeed;
      
      // Update position with slight wave motion
      particle.x += particle.speedX + Math.sin(particle.angle * Math.PI / 180) * 0.2;
      particle.y += particle.speedY + Math.cos(particle.angle * Math.PI / 180) * 0.2;
      
      // Bounce off edges with slight randomization
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
        particle.speedX += (Math.random() - 0.5) * 0.1; // Add slight randomization
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
        particle.speedY += (Math.random() - 0.5) * 0.1; // Add slight randomization
      }
    });
    
    requestAnimationFrame(updateParticles);
  }
  
  // Start animation
  updateParticles();
  
  // Add mouse interaction with improved effects
  let mouse = {
    x: null,
    y: null,
    radius: 100
  };
  
  heroSection.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    
    // Add a ripple effect on mouse move
    particles.forEach(particle => {
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        // Repel particles from mouse cursor
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = dx / distance || 0;
        const directionY = dy / distance || 0;
        
        particle.x += directionX * force * 2;
        particle.y += directionY * force * 2;
        
        // Increase pulse effect
        particle.pulseSize = Math.min(1, particle.pulseSize + 0.3);
      }
    });
  });
  
  heroSection.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Create burst effect on click
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      
      particles.push({
        x: clickX,
        y: clickY,
        size: minSize + Math.random() * (maxSize - minSize),
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        angle: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        pulseSize: 0.5,
        pulseSpeed: 0.05 + Math.random() * 0.05,
        pulseDirection: 1,
        // Give these particles limited lifetime
        lifetime: 100,
        age: 0
      });
      
      // Remove older particles to prevent unlimited growth
      if (particles.length > 100) {
        particles.shift();
      }
    }
  });
  
  heroSection.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
  });
});
