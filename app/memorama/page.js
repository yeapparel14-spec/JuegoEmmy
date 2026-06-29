'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import BackButton from '../../components/BackButton';
import Confetti from '../../components/Confetti';
import { content } from '../../config/content';

const { memorama } = content;

function buildDeck() {
  const pairs = memorama.pares.flatMap((card) => [
    { ...card, uid: `${card.id}-a` },
    { ...card, uid: `${card.id}-b` },
  ]);
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

export default function MemoramaPage() {
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);   // indices currently face-up
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [won, setWon] = useState(false);

  const init = useCallback(() => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
    setWon(false);
  }, []);

  useEffect(() => { init(); }, [init]);

  const handleCard = (idx) => {
    if (locked) return;
    if (matched.has(deck[idx]?.uid)) return;
    if (flipped.includes(idx)) return;
    if (flipped.length === 2) return;

    const next = [...flipped, idx];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;

      if (deck[a].id === deck[b].id) {
        const newMatched = new Set(matched);
        newMatched.add(deck[a].uid);
        newMatched.add(deck[b].uid);
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.size === deck.length) setWon(true);
      } else {
        setLocked(true);
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 950);
      }
    }
  };

  const isRevealed = (idx) =>
    flipped.includes(idx) || matched.has(deck[idx]?.uid);

  const totalPairs = deck.length / 2;
  const matchedPairs = matched.size / 2;

  return (
    <div className="min-h-dvh flex flex-col items-center px-4 pt-8 pb-14">
      {won && <Confetti />}

      <div className="self-start mb-6"><BackButton /></div>

      {/* Title */}
      <div className="page-header w-full mb-4">
        <div className="text-4xl mb-2">🃏</div>
        <h1 className="page-title">{memorama.titulo}</h1>
        <p className="page-subtitle">{memorama.subtitulo}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-6">
        <div className="bg-white rounded-xl px-5 py-2.5 border border-rosa-100 shadow-sm text-center">
          <div className="text-xl font-bold text-rosa-600">{moves}</div>
          <div className="text-xs text-rosa-400">{memorama.etiquetaMovimientos}</div>
        </div>
        <div className="bg-white rounded-xl px-5 py-2.5 border border-rosa-100 shadow-sm text-center">
          <div className="text-xl font-bold text-rosa-600">
            {matchedPairs}/{totalPairs}
          </div>
          <div className="text-xs text-rosa-400">{memorama.etiquetaPares}</div>
        </div>
      </div>

      {/* Win screen */}
      {won ? (
        <div className="animate-pop-in bg-white rounded-3xl shadow-lg border border-rosa-200
                        p-8 max-w-xs w-full text-center mb-6">
          <div className="text-5xl mb-3">🎊</div>
          <p className="font-playfair text-xl font-semibold text-rosa-800 mb-1 leading-snug">
            {memorama.mensajeGana}
          </p>
          <p className="text-rosa-400 text-sm mt-1">
            ¡Lo lograste en {moves} movimientos!
          </p>
          <button onClick={init} className="btn-primary mt-5 w-full">
            {memorama.botonReinicio}
          </button>
        </div>
      ) : (
        /* Card grid — 4 columns */
        <div className="grid grid-cols-4 gap-2 w-full max-w-xs mx-auto mb-6">
          {deck.map((card, idx) => {
            const revealed = isRevealed(idx);
            const isMatch = matched.has(card.uid);
            return (
              <div
                key={card.uid}
                onClick={() => handleCard(idx)}
                className="aspect-square card-3d-wrapper cursor-pointer select-none"
                role="button"
                aria-label={revealed ? card.etiqueta : 'Carta oculta'}
              >
                <div className={`card-inner ${revealed ? 'flipped' : ''}`}>
                  {/* Cover (face-down) */}
                  <div className="card-cover bg-gradient-to-br from-rosa-500 to-rosa-700
                                  shadow-sm border-2 border-rosa-400">
                    <span className="text-white/50 text-xl">💕</span>
                  </div>
                  {/* Content (face-up) */}
                  <div
                    className={`card-reveal shadow-sm border-2 transition-colors duration-300 ${
                      isMatch
                        ? 'bg-emerald-50 border-emerald-300'
                        : 'bg-white border-rosa-200'
                    }`}
                  >
                    {card.image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={card.image}
                          alt={card.etiqueta}
                          fill
                          className="object-cover rounded-[0.875rem]"
                          sizes="80px"
                        />
                      </div>
                    ) : (
                      <span className="text-3xl">{card.emoji}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!won && (
        <button onClick={init} className="btn-secondary text-sm">
          Reiniciar juego
        </button>
      )}
    </div>
  );
}
