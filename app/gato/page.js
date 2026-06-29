'use client';

import { useState, useEffect, useCallback } from 'react';
import BackButton from '../../components/BackButton';
import { content } from '../../config/content';

const { gato } = content;

const WINS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkResult(board) {
  for (const [a, b, c] of WINS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo: [a, b, c] };
    }
  }
  if (board.every(Boolean)) return { winner: 'draw', combo: null };
  return null;
}

// Minimax with in-place backtracking — O(9!) worst case, fast enough for 3×3
function minimax(board, isMax, depth) {
  const r = checkResult(board);
  if (r) {
    if (r.winner === 'O') return 10 - depth;
    if (r.winner === 'X') return depth - 10;
    return 0;
  }
  let best = isMax ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = isMax ? 'O' : 'X';
      const score = minimax(board, !isMax, depth + 1);
      board[i] = null;
      best = isMax ? Math.max(best, score) : Math.min(best, score);
    }
  }
  return best;
}

function bestMove(boardSnap) {
  const b = [...boardSnap];
  let best = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = 'O';
      const s = minimax(b, false, 0);
      b[i] = null;
      if (s > best) { best = s; move = i; }
    }
  }
  return move;
}

const EMPTY = Array(9).fill(null);

export default function GatoPage() {
  const [board, setBoard] = useState(EMPTY);
  const [result, setResult] = useState(null);   // { winner, combo }
  const [thinking, setThinking] = useState(false);

  const reset = useCallback(() => {
    setBoard(EMPTY);
    setResult(null);
    setThinking(false);
  }, []);

  // AI responds after human move
  useEffect(() => {
    if (!thinking) return;
    const timer = setTimeout(() => {
      setBoard((prev) => {
        const move = bestMove(prev);
        if (move === -1) { setThinking(false); return prev; }
        const next = [...prev];
        next[move] = 'O';
        const r = checkResult(next);
        if (r) setResult(r);
        setThinking(false);
        return next;
      });
    }, 480);
    return () => clearTimeout(timer);
  }, [thinking]);

  const handleCell = (i) => {
    if (board[i] || result || thinking) return;
    const next = [...board];
    next[i] = 'X';
    setBoard(next);
    const r = checkResult(next);
    if (r) { setResult(r); return; }
    setThinking(true);
  };

  const statusMsg = () => {
    if (!result && thinking) return gato.pensando;
    if (!result) return `${gato.turno} — tú eres ${gato.simboloJugador}`;
    if (result.winner === 'X') return gato.mensajeGana;
    if (result.winner === 'O') return gato.mensajePierde;
    return gato.mensajeEmpate;
  };

  const statusColor = () => {
    if (!result) return 'bg-white border-rosa-100 text-rosa-700';
    if (result.winner === 'X') return 'bg-emerald-50 border-emerald-300 text-emerald-700';
    if (result.winner === 'draw') return 'bg-amber-50 border-amber-300 text-amber-700';
    return 'bg-rosa-50 border-rosa-300 text-rosa-700';
  };

  const cellSymbol = (v) => v === 'X' ? gato.simboloJugador : v === 'O' ? gato.simboloMaquina : '';

  return (
    <div className="min-h-dvh flex flex-col items-center px-4 pt-8 pb-14">
      <div className="self-start mb-6"><BackButton /></div>

      {/* Title */}
      <div className="page-header w-full mb-4">
        <div className="text-4xl mb-2">⭕</div>
        <h1 className="page-title">{gato.titulo}</h1>
        <p className="page-subtitle">{gato.subtitulo}</p>
      </div>

      {/* Status */}
      <div className={`status-pill border mb-6 ${statusColor()}`}>
        {statusMsg()}
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {board.map((cell, i) => {
          const isWin = result?.combo?.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleCell(i)}
              aria-label={`Celda ${i + 1}`}
              className={[
                'w-24 h-24 md:w-28 md:h-28 rounded-2xl text-4xl font-bold',
                'flex items-center justify-center select-none',
                'transition-all duration-200 shadow-sm',
                isWin
                  ? 'bg-rosa-100 border-2 border-rosa-500 scale-105 shadow-rosa-200'
                  : cell
                  ? 'bg-white border-2 border-rosa-200 cursor-default'
                  : 'bg-white border-2 border-rosa-100 hover:border-rosa-400 hover:bg-rosa-50 hover:scale-105 cursor-pointer active:scale-95',
              ].join(' ')}
            >
              {cell && (
                <span className={cell === board[i] ? 'animate-bounce-soft' : ''}>
                  {cellSymbol(cell)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Symbols legend */}
      <div className="flex items-center gap-6 mb-8">
        <div className="bg-white rounded-xl px-5 py-3 border border-rosa-100 shadow-sm text-center">
          <div className="text-2xl">{gato.simboloJugador}</div>
          <div className="text-xs text-rosa-400 mt-1">Tú</div>
        </div>
        <span className="text-rosa-300 font-bold text-lg">vs</span>
        <div className="bg-white rounded-xl px-5 py-3 border border-rosa-100 shadow-sm text-center">
          <div className="text-2xl">{gato.simboloMaquina}</div>
          <div className="text-xs text-rosa-400 mt-1">Máquina</div>
        </div>
      </div>

      {/* Actions */}
      {result ? (
        <button onClick={reset} className="btn-primary">{gato.botonReinicio}</button>
      ) : (
        <button onClick={reset} className="btn-secondary text-sm">{gato.botonReset}</button>
      )}
    </div>
  );
}
