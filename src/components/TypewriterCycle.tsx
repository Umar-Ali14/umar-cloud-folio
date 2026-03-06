import { useState, useEffect, useRef } from 'react';

const phrases = [
  'Cloud Solutions Architect',
  'AWS & Azure Expert',
  'DevOps Practitioner',
  'Infrastructure Engineer',
  'Multi-Cloud Strategist',
];

interface TypewriterCycleProps {
  className?: string;
}

const TypewriterCycle = ({ className }: TypewriterCycleProps) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      if (text.length < currentPhrase.length) {
        timeoutRef.current = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, 80);
      } else {
        // Pause then start deleting
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 50);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span className={className}>
      {text}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          backgroundColor: 'hsl(var(--primary))',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: 'cursorBlink 0.9s step-end infinite',
        }}
      />
    </span>
  );
};

export default TypewriterCycle;
