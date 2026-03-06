import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect touch devices
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Hide default cursor
    document.body.style.cursor = 'none';
    // Also hide cursor on all interactive elements
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = '*, a, button, [role="button"], input, textarea, select { cursor: none !important; }';
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .glass-card, input, textarea, select')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .glass-card, input, textarea, select')) {
        setIsHovering(false);
      }
    };

    // Lerp loop for ring
    const lerpInterval = setInterval(() => {
      const lerp = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      }
    }, 16);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.body.style.cursor = '';
      const cursorStyle = document.getElementById('custom-cursor-style');
      if (cursorStyle) cursorStyle.remove();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      clearInterval(lerpInterval);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '30px' : '12px',
          height: isHovering ? '30px' : '12px',
          borderRadius: '50%',
          backgroundColor: 'hsl(var(--primary))',
          boxShadow: '0 0 10px hsl(var(--primary) / 0.6), 0 0 20px hsl(var(--primary) / 0.3)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.25s ease, height 0.25s ease',
          marginLeft: isHovering ? '-9px' : '0px',
          marginTop: isHovering ? '-9px' : '0px',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '60px' : '36px',
          height: isHovering ? '60px' : '36px',
          borderRadius: '50%',
          border: '1.5px solid hsl(var(--primary) / 0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.3s ease, height 0.3s ease',
          marginLeft: isHovering ? '-12px' : '0px',
          marginTop: isHovering ? '-12px' : '0px',
        }}
      />
    </>
  );
};

export default CustomCursor;
