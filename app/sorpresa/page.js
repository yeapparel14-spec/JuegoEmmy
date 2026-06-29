'use client';

import { useState } from 'react';
import BackButton from '../../components/BackButton';
import { content } from '../../config/content';

const { sorpresa } = content;

export default function SorpresaPage() {
  const [message, setMessage] = useState(null);
  const [fading, setFading] = useState(false);
  const [count, setCount] = useState(0);
  const [seen, setSeen] = useState([]);

  const nextMessage = () => {
    if (fading) return;
    setFading(true);

    setTimeout(() => {
      let pool = seen;
      if (pool.length >= sorpresa.mensajes.length) pool = [];

      const remaining = sorpresa.mensajes
        .map((_, i) => i)
        .filter((i) => !pool.includes(i));

      const pick = remaining[Math.floor(Math.random() * remaining.length)];
      setSeen([...pool, pick]);
      setMessage(sorpresa.mensajes[pick]);
      setCount((c) => c + 1);
      setFading(false);
    }, 350);
  };

  return (
    <div className="min-h-dvh flex flex-col items-center px-4 pt-8 pb-14">
      <div className="self-start mb-6"><BackButton /></div>

      {/* Title */}
      <div className="page-header w-full mb-8">
        <div className="text-4xl mb-2">💌</div>
        <h1 className="page-title">{sorpresa.titulo}</h1>
        <p className="page-subtitle">{sorpresa.subtitulo}</p>
      </div>

      {/* Message card */}
      <div
        className={`w-full max-w-sm mb-10 transition-all duration-300 ${
          fading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="bg-white rounded-3xl shadow-lg border border-rosa-200 p-8
                        min-h-[168px] flex items-center justify-center text-center">
          {message ? (
            <p className="font-playfair text-lg italic text-rosa-800 leading-relaxed">
              &ldquo;{message}&rdquo;
            </p>
          ) : (
            <div className="text-rosa-300">
              <div className="text-5xl mb-3 animate-pulse-heart">💝</div>
              <p className="text-sm font-light whitespace-pre-line">
                {sorpresa.placeholder}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Big pulsing heart button */}
      <button
        onClick={nextMessage}
        disabled={fading}
        aria-label="Mostrar mensaje de amor"
        className={`text-7xl select-none transition-all duration-200 leading-none
                    ${fading
                      ? 'scale-90 opacity-60'
                      : 'animate-pulse-heart hover:scale-110 active:scale-90'
                    } disabled:cursor-wait`}
      >
        💝
      </button>

      <p className="mt-4 text-rosa-400 text-sm font-light">{sorpresa.boton}</p>

      {count > 0 && (
        <p className="mt-6 text-rosa-300 text-xs">
          {count} {sorpresa.etiquetaMensajes}
        </p>
      )}
    </div>
  );
}
