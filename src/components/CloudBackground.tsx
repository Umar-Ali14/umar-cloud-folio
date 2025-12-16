import { useEffect, useRef, useState, useCallback } from 'react';

interface CloudNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  isCloud: boolean;
  glowIntensity: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const CloudBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<CloudNode[]>([]);
  const particlesRef = useRef<Particle[]>([]);
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

    // Initialize cloud nodes
    const nodeCount = 15;
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      size: i < 3 ? 60 + Math.random() * 30 : 25 + Math.random() * 25,
      isCloud: i < 8,
      glowIntensity: 0.5 + Math.random() * 0.5,
    }));

    // Initialize particles
    const particleCount = 60;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
    }));

    const drawCloud = (x: number, y: number, size: number, glowIntensity: number) => {
      ctx.save();
      
      // Glow effect
      ctx.shadowColor = `rgba(0, 200, 255, ${glowIntensity * 0.8})`;
      ctx.shadowBlur = 20;
      
      ctx.strokeStyle = `rgba(0, 200, 255, ${glowIntensity * 0.6})`;
      ctx.lineWidth = 1.5;
      
      // Cloud shape using bezier curves
      ctx.beginPath();
      const cloudWidth = size;
      const cloudHeight = size * 0.6;
      
      // Main cloud body
      ctx.moveTo(x - cloudWidth * 0.4, y + cloudHeight * 0.2);
      
      // Left bump
      ctx.bezierCurveTo(
        x - cloudWidth * 0.5, y - cloudHeight * 0.2,
        x - cloudWidth * 0.2, y - cloudHeight * 0.4,
        x, y - cloudHeight * 0.3
      );
      
      // Top center bump (bigger)
      ctx.bezierCurveTo(
        x + cloudWidth * 0.1, y - cloudHeight * 0.5,
        x + cloudWidth * 0.3, y - cloudHeight * 0.5,
        x + cloudWidth * 0.35, y - cloudHeight * 0.2
      );
      
      // Right bump
      ctx.bezierCurveTo(
        x + cloudWidth * 0.5, y - cloudHeight * 0.15,
        x + cloudWidth * 0.5, y + cloudHeight * 0.2,
        x + cloudWidth * 0.4, y + cloudHeight * 0.2
      );
      
      // Bottom flat
      ctx.lineTo(x - cloudWidth * 0.4, y + cloudHeight * 0.2);
      
      ctx.stroke();
      ctx.restore();
    };

    const drawConnectionNode = (x: number, y: number, size: number) => {
      ctx.save();
      
      // Outer glow
      ctx.shadowColor = 'rgba(0, 200, 255, 0.8)';
      ctx.shadowBlur = 15;
      
      // Node circle
      ctx.beginPath();
      ctx.arc(x, y, size / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 200, 255, 0.3)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 200, 255, 0.7)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Inner bright dot
      ctx.beginPath();
      ctx.arc(x, y, size / 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
      
      ctx.restore();
    };

    const drawConnections = () => {
      const nodes = nodesRef.current;
      const connectionDistance = 300;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.4;
            
            ctx.save();
            ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
            ctx.lineWidth = 1;
            
            // Glow effect for lines
            ctx.shadowColor = 'rgba(0, 200, 255, 0.5)';
            ctx.shadowBlur = 5;
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            
            // Draw glowing dots along the line
            const dotCount = Math.floor(distance / 50);
            for (let d = 1; d < dotCount; d++) {
              const t = d / dotCount;
              const dotX = nodes[i].x + dx * t;
              const dotY = nodes[i].y + dy * t;
              
              ctx.beginPath();
              ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(0, 200, 255, ${opacity * 0.8})`;
              ctx.fill();
            }
            
            ctx.restore();
          }
        }
      }
    };

    const drawParticles = () => {
      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 200, 255, 0.8)';
        ctx.shadowBlur = 5;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${particle.opacity})`;
        ctx.fill();
        ctx.restore();
      });
    };

    const drawHorizonGrid = () => {
      const horizonY = dimensions.height * 0.85;
      const gridSpacing = 60;
      
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 200, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.shadowColor = 'rgba(0, 200, 255, 0.3)';
      ctx.shadowBlur = 3;
      
      // Horizontal lines with perspective
      for (let i = 0; i < 8; i++) {
        const y = horizonY + i * (gridSpacing * (1 + i * 0.3));
        const opacity = 0.15 * (1 - i / 8);
        ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }
      
      // Vertical lines converging to center
      const centerX = dimensions.width / 2;
      for (let i = -10; i <= 10; i++) {
        const startX = centerX + i * gridSpacing * 4;
        const endX = centerX + i * gridSpacing * 0.5;
        ctx.strokeStyle = `rgba(0, 200, 255, ${0.1 - Math.abs(i) * 0.008})`;
        ctx.beginPath();
        ctx.moveTo(startX, dimensions.height);
        ctx.lineTo(endX, horizonY);
        ctx.stroke();
      }
      
      // Horizon glow line
      const gradient = ctx.createLinearGradient(0, horizonY - 50, 0, horizonY + 50);
      gradient.addColorStop(0, 'rgba(0, 200, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 200, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 200, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, horizonY - 50, dimensions.width, 100);
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw horizon grid first (background layer)
      drawHorizonGrid();

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;
      });
      drawParticles();

      // Update node positions
      nodesRef.current.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        const padding = 80;
        if (node.x < padding || node.x > dimensions.width - padding) {
          node.vx *= -1;
          node.x = Math.max(padding, Math.min(dimensions.width - padding, node.x));
        }
        if (node.y < padding || node.y > dimensions.height - padding) {
          node.vy *= -1;
          node.y = Math.max(padding, Math.min(dimensions.height - padding, node.y));
        }

        node.vx += (Math.random() - 0.5) * 0.003;
        node.vy += (Math.random() - 0.5) * 0.003;

        const maxVel = 0.2;
        node.vx = Math.max(-maxVel, Math.min(maxVel, node.vx));
        node.vy = Math.max(-maxVel, Math.min(maxVel, node.vy));

        // Pulse glow intensity
        node.glowIntensity = 0.5 + Math.sin(Date.now() / 2000 + node.id) * 0.3;
      });

      // Draw connections
      drawConnections();

      // Draw nodes (clouds and connection points)
      nodesRef.current.forEach(node => {
        if (node.isCloud) {
          drawCloud(node.x, node.y, node.size, node.glowIntensity);
        } else {
          drawConnectionNode(node.x, node.y, node.size);
        }
      });

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
