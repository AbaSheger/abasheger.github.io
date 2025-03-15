document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  
  // Add event listener for profile picture interaction
  const profilePicture = document.getElementById('profile-picture');
  if (profilePicture) {
    profilePicture.addEventListener('click', function(e) {
      // Create particle explosion from profile picture
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Create particle burst
      createParticleBurst(centerX, centerY, 30);
    });
  }
});

// Main function to create the particle background
function createParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Particle settings
  const particleCount = 100;
  const particles = [];
  const particleBaseRadius = 2;
  const particleVariance = 1;
  const particleBaseSpeed = 0.2;
  const lineWidth = 0.5;
  const lineDistance = 150;
  const colors = ['#6c63ff', '#9c95ff', '#4b45b2'];
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: particleBaseSpeed + Math.random() * 0.5,
      directionX: Math.random() - 0.5,
      directionY: Math.random() - 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: particleBaseRadius + Math.random() * particleVariance,
      opacity: 0.1 + Math.random() * 0.5
    });
  }
  
  // Mouse position tracking for interaction
  let mouseX = 0;
  let mouseY = 0;
  let mouseRadius = 150;
  let isMouseOver = false;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseOver = true;
  });
  
  document.addEventListener('mouseout', function() {
    isMouseOver = false;
  });
  
  // Special effect when near profile picture
  let profileRect = null;
  const profilePicture = document.getElementById('profile-picture');
  if (profilePicture) {
    profileRect = profilePicture.getBoundingClientRect();
    
    // Update profile rect on resize
    window.addEventListener('resize', function() {
      profileRect = profilePicture.getBoundingClientRect();
    });
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Move particles
      p.x += p.directionX * p.speed;
      p.y += p.directionY * p.speed;
      
      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) {
        p.directionX *= -1;
      }
      
      if (p.y < 0 || p.y > canvas.height) {
        p.directionY *= -1;
      }
      
      // Mouse interaction - attraction to mouse
      if (isMouseOver) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          p.directionX += dx * force * 0.01;
          p.directionY += dy * force * 0.01;
        }
      }
      
      // Profile picture interaction - orbit around profile
      if (profileRect) {
        const profileCenterX = profileRect.left + profileRect.width / 2;
        const profileCenterY = profileRect.top + profileRect.height / 2;
        const dx = profileCenterX - p.x;
        const dy = profileCenterY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < profileRect.width * 1.5) {
          // Create orbital effect
          const force = (profileRect.width * 1.5 - distance) / (profileRect.width * 1.5);
          const angle = Math.atan2(dy, dx);
          p.directionX += Math.cos(angle + Math.PI/2) * force * 0.02;
          p.directionY += Math.sin(angle + Math.PI/2) * force * 0.02;
        }
      }
      
      // Limit speed
      const speed = Math.sqrt(p.directionX * p.directionX + p.directionY * p.directionY);
      if (speed > 1.5) {
        p.directionX = (p.directionX / speed) * 1.5;
        p.directionY = (p.directionY / speed) * 1.5;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      
      // Draw connections between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < lineDistance) {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (lineDistance - distance) / lineDistance * 0.2;
          ctx.lineWidth = lineWidth;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Resize handler
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Function to create a burst of particles from a point
function createParticleBurst(x, y, count) {
  const burstCanvas = document.createElement('canvas');
  const burstCtx = burstCanvas.getContext('2d');
  
  burstCanvas.style.position = 'fixed';
  burstCanvas.style.top = '0';
  burstCanvas.style.left = '0';
  burstCanvas.style.width = '100%';
  burstCanvas.style.height = '100%';
  burstCanvas.style.pointerEvents = 'none';
  burstCanvas.style.zIndex = '100';
  burstCanvas.width = window.innerWidth;
  burstCanvas.height = window.innerHeight;
  
  document.body.appendChild(burstCanvas);
  
  const particles = [];
  const colors = ['#6c63ff', '#9c95ff', '#4b45b2', '#8d86ff'];
  
  // Create particles
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 5;
    
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 3 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      life: 1
    });
  }
  
  function animateBurst() {
    burstCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
    
    let particlesAlive = false;
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      if (p.life > 0) {
        particlesAlive = true;
        
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // Gravity
        p.life -= 0.02;
        p.opacity = p.life;
        
        burstCtx.beginPath();
        burstCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        burstCtx.fillStyle = p.color;
        burstCtx.globalAlpha = p.opacity;
        burstCtx.fill();
      }
    }
    
    if (particlesAlive) {
      requestAnimationFrame(animateBurst);
    } else {
      document.body.removeChild(burstCanvas);
    }
  }
  
  animateBurst();
}

// Make the createParticleBurst function globally available
window.createParticleExplosion = function(x, y, count, colors) {
  createParticleBurst(x, y, count || 30, colors || ['#6c63ff', '#9c95ff', '#4b45b2']);
};
