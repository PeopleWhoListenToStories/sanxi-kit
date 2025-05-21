'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  delay?: number;
  showCursorWhenDone?: boolean;
}

export default function TypewriterEffect({ text, delay = 100, showCursorWhenDone = true }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const _text = Array.from(text)

    setDisplayText('');
    setIsTypingDone(false);
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      if (currentIndex < _text.length) {
        setDisplayText(prev => {
          return prev + (_text[currentIndex] ?? '')
        });
        currentIndex++;
        if (currentIndex === _text.length) {
          setIsTypingDone(true);
        }
      }
    }, delay);

    // 光标闪烁效果
    const cursorIntervalId = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(intervalId);
      clearInterval(cursorIntervalId);
    };
  }, [text, delay]);

  return (
    <span className="inline-block">
      {displayText}
      {(!isTypingDone || showCursorWhenDone) && (
        <span
          className={`inline-block w-[0.5em] h-[2px] ml-1 align-bottom ${showCursor ? 'bg-current' : 'bg-transparent'}`}
          style={{ transition: 'background-color 0.2s' }}
        />
      )}
    </span>
    
  );
}