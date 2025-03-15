document.addEventListener('DOMContentLoaded', function() {
  // Only initialize if hero section exists
  const heroSection = document.querySelector('.hero-background');
  if (!heroSection) return;
  
  // Create canvas element for particles
  const canvas = document.createElement('canvas');
  canvas.className = 'particles-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none'; // Allow clicks to pass through
  
  // Insert canvas as first child of hero background
  heroSection.prepend(canvas);
  
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
  
  // Particle settings
  const particleCount = 40;
  const particleColors = ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)'];
  const minSize = 2;
  const maxSize = 5;
  const minSpeed = 0.2;
  const maxSpeed = 0.8;
  const connectionDistance = 100;
  const connectionOpacity = 0.15;
  
  // Particle array
  const particles = [];
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: minSize + Math.random() * (maxSize - minSize),
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed
    });
  }
  
  // Update particles
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
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${connectionOpacity * (1 - distance / connectionDistance)})`;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Then draw particles
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    });
    
    requestAnimationFrame(updateParticles);
  }
  
  // Start animation
  updateParticles();
  
  // Add mouse interaction
  let mouse = {
    x: null,
    y: null,
    radius: 100
  };
  
  heroSection.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  });
  
  heroSection.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
  });
});
