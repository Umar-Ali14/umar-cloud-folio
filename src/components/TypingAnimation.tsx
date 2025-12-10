import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

const TypingAnimation = ({ 
  text, 
  className, 
  speed = 80, 
  delay = 500,
  cursor = true 
}: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [displayedText, text, speed, isTyping]);

  // Cursor blink effect
  useEffect(() => {
    if (!cursor) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <span className={cn('inline-flex', className)}>
      <span>{displayedText}</span>
      {cursor && (
        <span 
          className={cn(
            'inline-block w-[3px] h-[1em] bg-primary ml-1 rounded-sm transition-opacity duration-100',
            showCursor ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transform: 'translateY(0.1em)' }}
        />
      )}
    </span>
  );
};

export default TypingAnimation;
