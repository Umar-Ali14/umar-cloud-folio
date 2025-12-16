import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  fadeDirection: number;
}

interface Connection {
  startIndex: number;
  endIndex: number;
  opacity: number;
  fadeDirection: number;
}

const CloudBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setParallaxOffset(scrollY * 0.3);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles
    const particleCount = 40;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: 2 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
    }));

    // Initialize some random connections
    connectionsRef.current = [];
    for (let i = 0; i < 15; i++) {
      connectionsRef.current.push({
        startIndex: Math.floor(Math.random() * particleCount),
        endIndex: Math.floor(Math.random() * particleCount),
        opacity: Math.random() * 0.3,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      });
    }


    // Draw a single particle with glow
    const drawParticle = (particle: Particle) => {
      ctx.save();
      
      // Soft glow
      ctx.shadowColor = `rgba(150, 180, 220, ${particle.opacity})`;
      ctx.shadowBlur = 10;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 200, 230, ${particle.opacity})`;
      ctx.fill();
      
      // Inner bright core
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 230, 250, ${particle.opacity * 1.2})`;
      ctx.fill();
      
      ctx.restore();
    };

    // Draw connections with fade effect
    const drawConnections = () => {
      const particles = particlesRef.current;
      
      connectionsRef.current.forEach(connection => {
        const start = particles[connection.startIndex];
        const end = particles[connection.endIndex];
        
        if (!start || !end || connection.opacity <= 0) return;
        
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only draw if within reasonable distance
        if (distance > 400) return;
        
        ctx.save();
        
        // Gradient line
        const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
        gradient.addColorStop(0, `rgba(150, 180, 220, ${connection.opacity * 0.5})`);
        gradient.addColorStop(0.5, `rgba(180, 200, 230, ${connection.opacity})`);
        gradient.addColorStop(1, `rgba(150, 180, 220, ${connection.opacity * 0.5})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(150, 180, 220, 0.3)';
        ctx.shadowBlur = 5;
        
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        
        ctx.restore();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Slow movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < -20) particle.x = dimensions.width + 20;
        if (particle.x > dimensions.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = dimensions.height + 20;
        if (particle.y > dimensions.height + 20) particle.y = -20;

        // Gentle fade in/out
        particle.opacity += particle.fadeDirection * 0.002;
        if (particle.opacity >= 0.6) {
          particle.fadeDirection = -1;
        } else if (particle.opacity <= 0.15) {
          particle.fadeDirection = 1;
        }

        drawParticle(particle);
      });

      // Update and draw connections
      connectionsRef.current.forEach(connection => {
        // Fade in/out
        connection.opacity += connection.fadeDirection * 0.003;
        if (connection.opacity >= 0.35) {
          connection.fadeDirection = -1;
        } else if (connection.opacity <= 0.02) {
          connection.fadeDirection = 1;
          // Randomly reassign connection targets for variety
          connection.startIndex = Math.floor(Math.random() * particlesRef.current.length);
          connection.endIndex = Math.floor(Math.random() * particlesRef.current.length);
        }
      });
      
      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 0,
        transform: `translate3d(0, ${-parallaxOffset}px, 0)`,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
};

export default CloudBackground;
