import { useEffect, useRef, useState } from 'react';

interface CloudIcon {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  icon: string;
  size: number;
  opacity: number;
}

const AWS_ICONS = [
  { name: 'EC2', path: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L19 8v1.5l-7 3.5-7-3.5V8l7-3.5zm-7 5l7 3.5 7-3.5v6l-7 3.5-7-3.5v-6z' },
  { name: 'S3', path: 'M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10h-4v-4h4v4z' },
  { name: 'VPC', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
  { name: 'IAM', path: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  { name: 'Lambda', path: 'M14.5 3L12 7.5 9.5 3H6l5 9-5 9h3.5l2.5-4.5L14.5 21H18l-5-9 5-9h-3.5z' },
  { name: 'RDS', path: 'M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm6 12c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-5c0 .5-2.13 2-6 2s-6-1.5-6-2V9.77c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V12z' },
];

const CloudBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconsRef = useRef<CloudIcon[]>([]);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Update dimensions when content changes
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

    // Initialize icons
    const iconCount = 12;
    iconsRef.current = Array.from({ length: iconCount }, (_, i) => ({
      id: `icon-${i}`,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      icon: AWS_ICONS[i % AWS_ICONS.length].name,
      size: 28 + Math.random() * 20,
      opacity: 0.06 + Math.random() * 0.08,
    }));

    const drawIcon = (icon: CloudIcon) => {
      const iconData = AWS_ICONS.find(i => i.name === icon.icon);
      if (!iconData) return;

      ctx.save();
      ctx.translate(icon.x, icon.y);
      ctx.scale(icon.size / 24, icon.size / 24);
      
      const path = new Path2D(iconData.path);
      ctx.strokeStyle = `rgba(147, 197, 253, ${icon.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke(path);
      
      ctx.restore();
    };

    const drawConnections = () => {
      const icons = iconsRef.current;
      const connectionDistance = 250;

      for (let i = 0; i < icons.length; i++) {
        for (let j = i + 1; j < icons.length; j++) {
          const dx = icons[j].x - icons[i].x;
          const dy = icons[j].y - icons[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            
            ctx.save();
            ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 8]);
            
            // Add glow effect
            ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
            ctx.shadowBlur = 8;
            
            ctx.beginPath();
            ctx.moveTo(icons[i].x, icons[i].y);
            ctx.lineTo(icons[j].x, icons[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update positions
      iconsRef.current.forEach(icon => {
        icon.x += icon.vx;
        icon.y += icon.vy;

        // Bounce off edges with padding
        const padding = 50;
        if (icon.x < padding || icon.x > dimensions.width - padding) {
          icon.vx *= -1;
          icon.x = Math.max(padding, Math.min(dimensions.width - padding, icon.x));
        }
        if (icon.y < padding || icon.y > dimensions.height - padding) {
          icon.vy *= -1;
          icon.y = Math.max(padding, Math.min(dimensions.height - padding, icon.y));
        }

        // Add slight random movement for organic feel
        icon.vx += (Math.random() - 0.5) * 0.005;
        icon.vy += (Math.random() - 0.5) * 0.005;

        // Limit velocity for slow, gentle movement
        const maxVel = 0.25;
        icon.vx = Math.max(-maxVel, Math.min(maxVel, icon.vx));
        icon.vy = Math.max(-maxVel, Math.min(maxVel, icon.vy));
      });

      // Draw connections first (behind icons)
      drawConnections();

      // Draw icons
      iconsRef.current.forEach(drawIcon);

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
      className="fixed inset-0 pointer-events-none blur-[0.5px]"
      style={{ zIndex: 0, filter: 'blur(0.5px)' }}
      aria-hidden="true"
    />
  );
};

export default CloudBackground;
