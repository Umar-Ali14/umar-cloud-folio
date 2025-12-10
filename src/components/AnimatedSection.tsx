import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import useScrollAnimation from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in' | 'scale-up';
  delay?: number;
}

const AnimatedSection = ({ 
  children, 
  className, 
  animation = 'fade-up',
  delay = 0 
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const animationClasses = {
    'fade-up': 'translate-y-12 opacity-0',
    'fade-left': '-translate-x-12 opacity-0',
    'fade-right': 'translate-x-12 opacity-0',
    'fade-in': 'opacity-0',
    'scale-up': 'scale-95 opacity-0',
  };

  const visibleClasses = 'translate-x-0 translate-y-0 scale-100 opacity-100';

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? visibleClasses : animationClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
