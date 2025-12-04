import React, { useState, useEffect, useRef } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  cursor?: boolean;
  className?: string;
  startDelay?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 50,
  cursor = true,
  className = '',
  startDelay = 0,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setIsTypingComplete(false);
    indexRef.current = 0;

    // Clear any existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Start delay
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayedText((prev) => prev + text.charAt(indexRef.current));
          indexRef.current++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsTypingComplete(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && !isTypingComplete && <span className="animate-pulse font-bold">_</span>}
    </span>
  );
};

export default TypewriterEffect;
