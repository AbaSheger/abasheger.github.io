import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle settings - enhanced for a more modern look
    const particleCount = 60;
    const particleColors = [
      'rgba(109, 40, 217, 0.3)',  // primary-700
      'rgba(14, 116, 144, 0.2)',  // secondary-700
      'rgba(245, 158, 11, 0.2)',  // accent-500
    ];
    const minSize = 1;
    const maxSize = 4;
    const minSpeed = 0.1;
    const maxSpeed = 0.5;
    const connectionDistance = 120;
    const connectionOpacity = 0.1;
    
    // Create particles with improved variety
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: minSize + Math.random() * (maxSize - minSize),
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      directionChangeTime: Math.random() * 200 + 50,
      directionTimer: 0,
      opacity: Math.random() * 0.5 + 0.3,
      pulse: Math.random() > 0.7, // Some particles will pulse
      pulseSpeed: Math.random() * 0.02 + 0.01
    }));
    
    // Mouse interaction
    let mouse = {
      x: null,
      y: null,
      radius: 150
    };
    
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Animation loop with improved physics
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // First draw connections with gradient effect
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Create gradient connections
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y, 
              particles[j].x, particles[j].y
            );
            
            gradient.addColorStop(0, particles[i].color.replace(/[\d.]+\)$/g, `${connectionOpacity * (1 - distance / connectionDistance)})`));
            gradient.addColorStop(1, particles[j].color.replace(/[\d.]+\)$/g, `${connectionOpacity * (1 - distance / connectionDistance)})`));
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Then draw and update particles
      particles.forEach(particle => {
        // Update particle opacity if pulsing
        if (particle.pulse) {
          particle.opacity += Math.sin(Date.now() * particle.pulseSpeed) * 0.01;
          particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
        }
        
        // Draw particle with current opacity
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${particle.opacity})`);
        ctx.fill();
        
        // Update position with more natural movement
        particle.directionTimer++;
        if (particle.directionTimer >= particle.directionChangeTime) {
          particle.speedX = (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed;
          particle.speedY = (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed;
          particle.directionTimer = 0;
          particle.directionChangeTime = Math.random() * 200 + 50;
        }
        
        // Apply mouse repulsion effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            particle.x += Math.cos(angle) * force * 2;
            particle.y += Math.sin(angle) * force * 2;
          }
        }
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges with damping
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -0.9;
          particle.x = particle.x < 0 ? 0 : canvas.width;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -0.9;
          particle.y = particle.y < 0 ? 0 : canvas.height;
        }
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800 z-0"></div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};

export default ParticleBackground;
