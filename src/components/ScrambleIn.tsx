import React, { useEffect, useState, useRef } from 'react';

interface ScrambleInProps {
  text: string;
  delay?: number;
  triggered: boolean;
  className?: string;
}

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const ScrambleIn: React.FC<ScrambleInProps> = ({
  text,
  delay = 0,
  triggered,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>('\u00A0');
  const [hasCompleted, setHasCompleted] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) {
      setDisplayText('\u00A0');
      setHasCompleted(false);
      return;
    }

    if (hasCompleted) {
      setDisplayText(text);
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      let cursor = 0;

      intervalRef.current = window.setInterval(() => {
        cursor += 0.5;
        const revealedCount = Math.floor(cursor);

        if (revealedCount >= text.length) {
          setDisplayText(text);
          setHasCompleted(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return;
        }

        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (i < revealedCount) {
            result += text[i];
          } else if (i < revealedCount + 3) {
            if (text[i] === ' ') {
              result += ' ';
            } else {
              result += CHARSET[Math.floor(Math.random() * CHARSET.length)];
            }
          } else {
            break;
          }
        }
        setDisplayText(result || '\u00A0');
      }, 25);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggered, text, delay, hasCompleted]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
    </span>
  );
};

export default ScrambleIn;
