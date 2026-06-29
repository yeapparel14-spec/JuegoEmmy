'use client';

import { useState, useEffect } from 'react';

const EMOJIS = ['❤️', '💕', '💗', '💖', '✨', '🌸', '💝', '🩷', '🌷', '⭐'];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      size: 14 + Math.random() * 18,
      duration: 12 + Math.random() * 10,
      delay: -(Math.random() * 20),
      emoji: EMOJIS[i % EMOJIS.length],
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-0 select-none heart-float"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: 0.18,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}
