'use client';

import { useState, useEffect } from 'react';

const COLORS = [
  '#E8446B', '#FF8FAB', '#F4A261', '#FFD88A',
  '#C8B4FF', '#B4E4FF', '#AFFFB4', '#FF6B8A',
];

export default function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      width: 6 + Math.random() * 8,
      height: 4 + Math.random() * 6,
      duration: 2 + Math.random() * 2.5,
      delay: Math.random() * 1.2,
      rotation: Math.random() * 360,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm confetti-piece"
          style={{
            left: `${p.x}%`,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
